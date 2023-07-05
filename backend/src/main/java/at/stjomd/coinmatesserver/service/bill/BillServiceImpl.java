package at.stjomd.coinmatesserver.service.bill;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.repository.BillRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BillServiceImpl implements BillService {

	private final BillRepository billRepository;
	private final BillServiceValidator validator;

	public BillServiceImpl(
		BillRepository billRepository, BillServiceValidator validator
	) {
		this.billRepository = billRepository;
		this.validator = validator;
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
	@Transactional
	public Bill createBill(Bill bill) {
		log.trace("createBill({})", bill);
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
		// Validate and save
		validator.createBill(bill);
		return billRepository.save(bill);
	}

}
