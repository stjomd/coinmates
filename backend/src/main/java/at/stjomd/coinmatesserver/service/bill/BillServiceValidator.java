package at.stjomd.coinmatesserver.service.bill;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;
import at.stjomd.coinmatesserver.service.user.UserService;
import lombok.extern.slf4j.Slf4j;

/**
 * Validators for the respective methods in BillServiceImpl.java.
 */
@Slf4j
@Component
public class BillServiceValidator {

	private final UserService userService;

	public BillServiceValidator(UserService userService) {
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

	private static void fail(String message) {
		throw new ValidationFailedException(message);
	}

	private static void fail(String message, Throwable cause) {
		throw new ValidationFailedException(message, cause);
	}

}
