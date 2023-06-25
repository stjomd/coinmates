package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUser(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
            .orElseThrow(
                () -> new UsernameNotFoundException(String.format("User with email %s does not exist", email))
            );
    }

    @Override
    public User register(User user) {
        return user;
    }

    @Override
    public String authenticate(User user) {
        return "Hello";
    }

}
