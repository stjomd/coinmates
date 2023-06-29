package at.stjomd.coinmatesserver.exception;

import at.stjomd.coinmatesserver.entity.User;

/**
 * An exception that signifies that authentication was unsuccessful.
 */
public class AuthenticationFailedException extends Exception {

    public AuthenticationFailedException(String message) {
        super(message);
    }

    public AuthenticationFailedException(String message, Throwable cause) {
        super(message, cause);
    }

	public AuthenticationFailedException(User user) {
		super("Authentication failed for email " + user.getEmail());
	}

}
