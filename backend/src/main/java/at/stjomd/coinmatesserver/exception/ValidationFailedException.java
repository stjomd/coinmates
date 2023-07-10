package at.stjomd.coinmatesserver.exception;

/**
 * An exception that signifies that validation of some object failed.
 * This exception is used alongside with spring's validation exceptions.
 */
public class ValidationFailedException extends RuntimeException {

	public ValidationFailedException(String message) {
		super(message);
	}

	public ValidationFailedException(String message, Throwable cause) {
		super(message, cause);
	}

}
