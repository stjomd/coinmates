package at.stjomd.coinmatesserver.exception;

import at.stjomd.coinmatesserver.entity.User;

/**
 * An exception that signifies that user with an email already exists.
 */
public class UserAlreadyExistsException extends Exception {

	public UserAlreadyExistsException(String message) {
		super(message);
	}

	public UserAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public UserAlreadyExistsException(User user) {
		super("User with email " + user.getEmail() + " already exists");
	}

}
