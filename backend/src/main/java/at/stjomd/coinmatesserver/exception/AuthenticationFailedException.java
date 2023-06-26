package at.stjomd.coinmatesserver.exception;

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

}
