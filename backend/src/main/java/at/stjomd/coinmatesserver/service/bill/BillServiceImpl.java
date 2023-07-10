package at.stjomd.coinmatesserver.service.bill;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AccessForbiddenException;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;
import at.stjomd.coinmatesserver.repository.BillRepository;
import at.stjomd.coinmatesserver.repository.PaymentRepository;
import at.stjomd.coinmatesserver.service.user.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BillServiceImpl implements BillService {

	private final BillRepository billRepository;
	private final PaymentRepository paymentRepository;

	private final BillServiceValidator validator;
	private final UserService userService;

	public BillServiceImpl(
		BillRepository billRepository, PaymentRepository paymentRepository,
		BillServiceValidator validator, UserService userService
	) {
		this.billRepository = billRepository;
		this.paymentRepository = paymentRepository;
		this.validator = validator;
		this.userService = userService;
	}

	public Amount splitAmount(Bill bill) {
		return calculateSplitAmount(
			bill.getAmount(), bill.getPeople().size() + 1
		);
	}

	@Override
	public Amount calculateSplitAmount(Amount amount, Integer people) {
		log.trace("calculateSplitAmount({}, {})", amount, people);
		validator.calculateSplitAmount(amount, people);
		// Convert to double, round to two decimal places
		Double value = amount.getInteger() + (amount.getFraction() / 100.0);
		Double split = Math.round((value / people) * 100) / 100.0;
		// Convert to string to parse two parts separately
		String string = String.format("%.2f", split);
		String[] parts = string.split(",");
		// Construct an amount instance
		if (parts.length == 1) {
			return new Amount(split.intValue(), 0);
		} else {
			return new Amount(
				Integer.parseInt(parts[0]),
				Integer.parseInt(parts[1])
			);
		}
	}

	@Override
	public Bill getBill(Integer id, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException {
		log.trace("getBill(id = {})", id);
		Bill bill = billRepository.findById(id)
			.orElseThrow(() ->
				new NotFoundException("No bill found with ID: " + id)
			);
		// Check if this bill can be shown to authd user
		boolean authdUserIsCreator = bill.getCreator().getId()
			.equals(authenticatedUser.getId());
		boolean authdUserIsAssigned = false;
		for (User assignedPerson : bill.getPeople()) {
			if (assignedPerson.getId().equals(authenticatedUser.getId())) {
				authdUserIsAssigned = true; break;
			}
		}
		if (!authdUserIsCreator && !authdUserIsAssigned) {
			throw new AccessForbiddenException(
				"Attempted to access a bill that the requester is not part of"
			);
		}
		bill.setSplitAmount(splitAmount(bill));
		return bill;
	}

	@Override
	@Transactional
	public Bill createBill(Bill bill, User authenticatedUser)
	throws AccessForbiddenException {
		log.trace("createBill({})", bill);
		if (!bill.getCreator().getId().equals(authenticatedUser.getId())) {
			throw new AccessForbiddenException(
				"Attempted to create a bill for another user"
			);
		}
		// Remove creator from bill.people
		for (User friend : bill.getPeople()) {
			if (friend.getId().equals(bill.getCreator().getId())) {
				log.debug(
					"Removed creator (id = {}) from assigned people",
					bill.getCreator().getId()
				);
				bill.getPeople().remove(friend);
				break;
			}
		}
		bill.setCreationDate(new Date());
		bill.setStatus(Bill.Status.OPEN);
		// Validate and save
		validator.createBill(bill);
		Bill createdBill = billRepository.saveAndFlush(bill);
		// Refresh to retrieve nested objects (users)
		billRepository.refresh(createdBill);
		createdBill.setSplitAmount(splitAmount(createdBill));
		return createdBill;
	}

	@Override
	public Set<Bill> getBillsCreatedByUser(Integer id)
	throws NotFoundException {
		log.trace("getBillsCreatedByUser({})", id);
		User user = userService.getUser(id);
		return user.getCreatedBills();
	}

	@Override
	public Set<Bill> getBillsAssignedToUser(Integer id)
	throws NotFoundException {
		log.trace("getBillsAssignedToUser({})", id);
		User user = userService.getUser(id);
		return user.getAssignedBills();
	}

	@Override
	public List<Bill> getAllBillsForUser(Integer id) throws NotFoundException {
		log.trace("getAllBillsForUser({})", id);
		User user = userService.getUser(id);
		List<Bill> union = new ArrayList<>(user.getCreatedBills());
		union.addAll(user.getAssignedBills());
		Collections.sort(union,
			(a, b) -> -a.getCreationDate().compareTo(b.getCreationDate())
		);
		return union;
	}

	@Override
	@Transactional
	public Payment submitPayment(Payment payment, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException {
		log.trace("submitPayment({})", payment);
		validator.submitPayment(payment);
		// Retrieve managed bill entity and check if split amount matches
		Bill bill = getBill(payment.getBill().getId(), authenticatedUser);
		Amount splitAmount = splitAmount(bill);
		if (!splitAmount.equals(payment.getAmount())) {
			throw new ValidationFailedException(String.format(
				"Payment amount does not match bill's requested amount (of "
				+ "%d,%d)",
				splitAmount.getInteger(),
				splitAmount.getFraction()
			));
		}
		// Determine if this is the last payment for this bill
		int paidPersons = 0;
		for (User user : bill.getPeople()) {
			for (Payment submittedPayment : bill.getPayments()) {
				if (user.getId().equals(submittedPayment.getUser().getId())) {
					paidPersons += 1; break;
				}
			}
		}
		boolean lastPayment = paidPersons == bill.getPeople().size() - 1;
		// Set date, save payment, close bill if needed
		payment.setDate(new Date());
		Payment savedPayment = paymentRepository.save(payment);
		if (lastPayment) {
			bill.setStatus(Bill.Status.CLOSED);
			billRepository.save(bill);
		}
		return savedPayment;
	}

}
