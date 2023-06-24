package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    /**
     * Retrieves the user with the specified email.
     * @param email the email of a user.
     * @return the user with the specified email.
     * @throws UsernameNotFoundException if no user with the specified email exists.
     */
    User getUser(String email) throws UsernameNotFoundException;

    User register(User user);

    String authenticate(User user);

}
