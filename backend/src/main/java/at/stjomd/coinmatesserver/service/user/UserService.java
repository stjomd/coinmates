package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;

public interface UserService {

    /**
     * Retrieves the user with the specified email.
     * @param email the email of a user.
     * @return the user with the specified email.
     */
    User getUser(String email);

    User register(User user);

    String authenticate(User user);

}
