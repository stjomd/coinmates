package at.stjomd.coinmatesserver.service.user;

import java.util.Set;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;

/**
 * A service responsible for all user actions, including authentication.
 */
public interface UserService {

	/**
	 * Retrieves the user with the specified ID.
	 * @param id the ID of the user.
	 * @return the user with the specified ID.
	 * @throws NotFoundException if no user with such ID exists.
	 */
	User getUser(Integer id) throws NotFoundException;

	/**
	 * Retrieves the user with the specified email.
	 * @param email the email of a user.
	 * @return the user with the specified email.
	 * @throws NotFoundException of no user with such email exists.
	 */
	User getUser(String email) throws NotFoundException;

	/**
	 * Accepts a partial user entity, sets the regular role and active status,
	 * and registers the user.
	 * @param user the user entity, which must contain the email, password,
	 * 			   first and last name.
	 * @return the (total, i.e. with all fields set) registered user entity.
	 * 		   Warning: contains the hashed password.
	 * @throws UserAlreadyExistsException if a user with the same email already
	 * 		   exists.
	 */
	User register(User user) throws UserAlreadyExistsException;

	/**
	 * Accepts a partial user entity, and checks the credentials.
	 * @param user the user entity, which must contain the email and password.
	 * @return the user entity. TODO: adjust for security auth.
	 * @throws AuthenticationFailedException if authentication failed.
	 */
	User authenticate(User user) throws AuthenticationFailedException;

	/**
	 * Adds a friend relationship between two users.
	 * @param id the ID of one user making the request.
	 * @param friendId the ID of the other user.
	 * @return the updated set of friends of the user making the request.
	 * @throws NotFoundException if any of the two users could not be found.
	 */
	Set<User> addFriend(Integer id, Integer friendId)
	throws NotFoundException;

}
