package at.stjomd.coinmatesserver.exception;

/**
 * An exception that signifies that the request may not be processed.
 */
public class AccessForbiddenException extends Exception {

	public AccessForbiddenException(String message) {
		super(message);
	}

	public AccessForbiddenException(String message, Throwable cause) {
		super(message, cause);
	}

}
