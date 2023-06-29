package at.stjomd.coinmatesserver.exception;

import at.stjomd.coinmatesserver.entity.User;

/**
 * An exception that signifies that user with an email already exists.
 */
public class UserAlreadyExists extends Exception {

	public UserAlreadyExists(String message) {
		super(message);
	}

	public UserAlreadyExists(String message, Throwable cause) {
		super(message, cause);
	}

	public UserAlreadyExists(User user) {
		super("User with email " + user.getEmail() + " already exists");
	}

}
