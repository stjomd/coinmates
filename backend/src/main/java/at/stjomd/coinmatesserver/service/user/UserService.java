package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;

/**
 * A service responsible for all user actions, including authentication.
 */
public interface UserService {

	/**
	 * Retrieves the user with the specified email.
	 * @param email the email of a user.
	 * @return the user with the specified email.
	 */
	User getUser(String email);

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

}
