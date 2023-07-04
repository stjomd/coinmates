package at.stjomd.coinmatesserver.service.bill;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;

/**
 * Validators for the respective methods in BillServiceImpl.java.
 */
public class BillServiceValidator implements BillService {

	/**
	 * This method only validates the input parameters, and performs no other
	 * actions.
	 * @param amount see {@link BillService}
	 * @param people see {@link BillService}
	 * @return null.
	 * @throws ValidationFailedException if validation failed.
	 */
	public Amount calculateSplitAmount(Amount amount, Integer people)
	throws ValidationFailedException {
		if (people < 1) {
			fail("Amount of people must be at least 1");
		} else if (amount.getInteger() < 0) {
			fail("Integer part must be positive");
		} else if (amount.getFraction() < 0) {
			fail("Fractional part must be positive");
		} else if (amount.getFraction() > 99) {
			fail("Fractional part must be at most 99");
		}
		return null;
	}

	private static void fail(String message) throws ValidationFailedException {
		throw new ValidationFailedException(message);
	}

}
