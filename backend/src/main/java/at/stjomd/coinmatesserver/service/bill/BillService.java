package at.stjomd.coinmatesserver.service.bill;

import java.util.List;
import java.util.Set;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AccessForbiddenException;
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
	 * @param authenticatedUser the user currently logged in.
	 * @return the bill with the specified ID.
	 * @throws AccessForbiddenException if authenticated user is not part of
	 *         this bill.
	 * @throws NotFoundException if no bill with such ID exists.
	 */
	Bill getBill(Integer id, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException;

	/**
	 * Creates a bill entity.
	 * @param bill the bill to be created.
	 * @param authenticatedUser the user currently logged in.
	 * @return the saved bill.
	 * @throws AccessForbiddenException if authenticated user is not part of
	 *         this bill.
	 */
	Bill createBill(Bill bill, User authenticatedUser)
	throws AccessForbiddenException;

	/**
	 * Retrieves the set of bills created by a specified user.
	 * @param id the ID of the user.
	 * @return the set of bills where the creator is the specified user.
	 * @throws NotFoundException if no such user exists.
	 */
	Set<Bill> getBillsCreatedByUser(Integer id) throws NotFoundException;

	/**
	 * Retrieves the set of bills assigned to a specified user.
	 * @param id the ID of the user.
	 * @return the set of bills assigned to the specified user.
	 * @throws NotFoundException if no such user exists.
	 */
	Set<Bill> getBillsAssignedToUser(Integer id) throws NotFoundException;

	/**
	 * Retrieves the set of all bills associated with a specified user.
	 * @param id the ID of the user.
	 * @return a list of bills associated with the specified user, that is
	 * 		   bills either created by, or assigned to the user. Sorted by
	 * 		   creation date.
	 * @throws NotFoundException if no such user exists.
	 */
	List<Bill> getAllBillsForUser(Integer id) throws NotFoundException;

	/**
	 * Saves the payment and assigns it to the appropriate bill.
	 * @param payment the payment to save.
	 * @param authenticatedUser the user currently logged in.
	 * @return the saved payment entity.
	 * @throws AccessForbiddenException if authenticated user is not part of
	 *         the respective bill.
	 * @throws NotFoundException if the corresponding bill could not be found.
	 */
	Payment submitPayment(Payment payment, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException;

}
