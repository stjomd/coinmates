package at.stjomd.coinmatesserver.service.bill;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;
import lombok.extern.slf4j.Slf4j;

/**
 * Validators for the respective methods in BillServiceImpl.java.
 */
@Slf4j
public class BillServiceValidator {

	/**
	 * Validates the input parameters.
	 * @param amount see {@link BillService}.
	 * @param people see {@link BillService}.
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

	private static void fail(String message) {
		throw new ValidationFailedException(message);
	}

}
