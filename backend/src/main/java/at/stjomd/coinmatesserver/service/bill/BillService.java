package at.stjomd.coinmatesserver.service.bill;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;

public interface BillService {

	/**
	 * Calculates the split amount of a bill. Used to display correct values on
	 * front-end side.
	 * @param amount the total amount of the bill.
	 * @param people the amount of people assigned to the bill.
	 * @return the split amount (total amount divided by the amount of people).
	 * @throws ValidationFailedException if any of the arguments is invalid.
	 */
	Amount calculateSplitAmount(Amount amount, Integer people);

}
