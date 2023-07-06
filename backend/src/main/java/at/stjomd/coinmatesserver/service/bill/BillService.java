package at.stjomd.coinmatesserver.service.bill;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.exception.NotFoundException;
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

	/**
	 * Retrieves a bill with the specified ID.
	 * @param id the ID of the bill.
	 * @return the bill with the specified ID.
	 * @throws NotFoundException if no bill with such ID exists.
	 */
	Bill getBill(Integer id) throws NotFoundException;

	/**
	 * Creates a bill entity.
	 * @param bill the bill to be created.
	 * @return the saved bill.
	 */
	Bill createBill(Bill bill);

}
