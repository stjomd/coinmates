package at.stjomd.coinmatesserver.service.jwt;

import at.stjomd.coinmatesserver.entity.User;

import java.util.Map;

public interface JwtService {

    /**
     * Constructs a JWT token.
     * @param claims claims of the token.
     * @param user the subject user.
     * @return a JWT token in string format.
     */
    String constructToken(Map<String, Object> claims, User user);

    /**
     * Extracts the username of the subject from a JWT token.
     * @param jwt the JWT token.
     * @return the username of the subject.
     */
    String getUsername(String jwt);

    /**
     * Checks if the JWT token can be used.
     * @param jwt the JWT token.
     * @param user the user.
     * @return true, if the token is valid and not expired, or false otherwise.
     */
    boolean isValid(String jwt, User user);

}
