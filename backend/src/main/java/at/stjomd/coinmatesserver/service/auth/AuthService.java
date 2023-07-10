package at.stjomd.coinmatesserver.service.auth;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

	/**
	 * Logs the user in.
	 * @param user a user entity, containing at least the email and password.
	 * @param request the HTTP request.
	 * @return the complete user entity if authentication succeeds.
	 * @throws AuthenticationFailedException if authentication fails.
	 */
	User login(User user, HttpServletRequest request)
	throws AuthenticationFailedException;

	/**
	 * Registers a new user.
	 * @param user a user entity, containing at least the email, password, and
	 * 	      first and last name.
	 * @param request the HTTP request.
	 * @return the complete user entity if registration succeeds.
	 * @throws UserAlreadyExistsException if the user with specified email
	 * 		   already exists.
	 */
	User register(User user, HttpServletRequest request)
	throws UserAlreadyExistsException;

}
