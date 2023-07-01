package at.stjomd.coinmatesserver.exception;

import at.stjomd.coinmatesserver.entity.User;

/**
 * An exception that signifies that a value was not found.
 */
public class NotFoundException extends Exception {

	public NotFoundException(String message) {
		super(message);
	}

	public NotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

}
