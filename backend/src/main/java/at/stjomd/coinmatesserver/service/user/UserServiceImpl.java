package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Check that no user with the same email exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null; // TODO: throw exception
        }
		user.setRole(User.Role.REGULAR);
		user.setStatus(User.Status.ACTIVE);
        return userRepository.save(user);
    }

    @Override
    public String authenticate(User user) throws AuthenticationFailedException {
        User foundUser = userRepository.findByEmail(user.getEmail()).orElse(null);
        if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            return foundUser.getId().toString();
        }
        throw new AuthenticationFailedException("Authentication failed for email " + user.getEmail());
    }

}
