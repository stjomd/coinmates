package at.stjomd.coinmatesserver.service.bill;

import org.springframework.stereotype.Component;

import at.stjomd.coinmatesserver.entity.Amount;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class BillServiceImpl implements BillService {

	private final BillServiceValidator validator = new BillServiceValidator();

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

}
