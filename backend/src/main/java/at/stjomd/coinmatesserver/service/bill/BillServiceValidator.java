package at.stjomd.coinmatesserver.service.bill;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;
import at.stjomd.coinmatesserver.repository.BillRepository;
import at.stjomd.coinmatesserver.service.user.UserService;
import lombok.extern.slf4j.Slf4j;

/**
 * Validators for the respective methods in BillServiceImpl.java.
 */
@Slf4j
@Component
public class BillServiceValidator {

	private final BillRepository billRepository;
	private final UserService userService;

	public BillServiceValidator(
		BillRepository billRepository, UserService userService
	) {
		this.billRepository = billRepository;
		this.userService = userService;
	}

	/**
	 * Validates the input parameters for
	 * {@link BillService#calculateSplitAmount(Amount, Integer)}.
	 * @param amount see link above.
	 * @param people see link above.
	 * @throws ValidationFailedException if validation failed.
	 */
	public void calculateSplitAmount(Amount amount, Integer people) {
		log.trace("validator.calculateSplitAmount({}, {})", amount, people);
		if (people < 1) {
			fail("Amount of people must be at least 1");
		} else if (amount.getInteger() < 0) {
			fail("Integer part must be positive");
		} else if (amount.getFraction() < 0) {
			fail("Fractional part must be positive");
		} else if (amount.getFraction() > 99) {
			fail("Fractional part must be at most 99");
		}
	}

	/**
	 * Validates the input parameters for
	 * {@link BillService#createBill(Bill)}.
	 * @param amount see link above.
	 * @param people see link above.
	 * @throws ValidationFailedException if validation failed.
	 */
	public void createBill(Bill bill) {
		log.trace("validator.createBill({})", bill);
		// Check that users are correctly assigned
		if (bill.getCreator() == null) {
			fail("Creator must be present");
		} else if (bill.getPeople() == null) {
			fail("Collection of assigned friends must be present");
		} else if (bill.getPeople().size() < 1) {
			fail("At least one friend must be assigned to the bill");
		}
		// Check that assigned people are creator's friends
		try {
			User creator = userService.getUser(bill.getCreator().getId());
			Set<Integer> creatorFriendIds = creator.getFriends().stream()
				.map(User::getId)
				.collect(Collectors.toSet());
			Set<Integer> billPeopleIds = bill.getPeople().stream()
				.map(User::getId)
				.collect(Collectors.toSet());
			for (Integer id : billPeopleIds) {
				if (!creatorFriendIds.contains(id)) {
					fail("Creator is not friends with user ID " + id);
				}
			}
		} catch (NotFoundException exception) {
			fail("User with specified creator ID does not exist", exception);
		}
	}

	/**
	 * Validates the input parameters for
	 * {@link BillService#submitPayment(Payment)}.
	 * @param payment see link above.
	 * @throws ValidationFailedException if validation failed.
	 */
	public void submitPayment(Payment payment) {
		Bill bill = null;
		try {
			bill = billRepository.findById(payment.getBill().getId())
				.orElseThrow();
		} catch (NoSuchElementException exception) {
			fail("Bill with specified ID does not exist", exception);
		}
		if (bill == null) {
			fail("Internal error");
			return;
		}
		// Person paying must be assigned to bill.people
		boolean payerAssigned = false;
		for (User user : bill.getPeople()) {
			if (user.getId().equals(payment.getUser().getId())) {
				payerAssigned = true; break;
			}
		}
		if (!payerAssigned) {
			fail("Payer is not assigned to this bill");
		}
		// Do not allow duplicate payments
		for (Payment billPayment : bill.getPayments()) {
			if (billPayment.getUser().getId()
				.equals(payment.getUser().getId())
			) {
				fail("This user has already paid for this bill");
			}
		}
	}

	// ----- Helpers -----------------------------------------------------------

	private static void fail(String message) {
		throw new ValidationFailedException(message);
	}

	private static void fail(String message, Throwable cause) {
		throw new ValidationFailedException(message, cause);
	}

}
