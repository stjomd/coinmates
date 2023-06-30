package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import at.stjomd.coinmatesserver.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(
		UserRepository userRepository, PasswordEncoder passwordEncoder
	) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User getUser(String email) {
		log.trace("getUser({})", email);
		return userRepository.findByEmail(email).orElseThrow();
	}

	@Override
	public User register(User user) throws UserAlreadyExistsException {
		log.trace("register(email = {})", user.getEmail());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		// Check that no user with the same email exists
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			log.debug(
				"Attempted to register already existing email {}",
				user.getEmail()
			);
			throw new UserAlreadyExistsException(user);
		}
		user.setRole(User.Role.REGULAR);
		user.setStatus(User.Status.ACTIVE);
		return userRepository.save(user);
	}

	@Override
	public User authenticate(User user) throws AuthenticationFailedException {
		log.trace("authenticate(email = {})", user.getEmail());
		User foundUser = userRepository
			.findByEmail(user.getEmail())
			.orElse(null);
		if (foundUser != null && passwordEncoder.matches(
			user.getPassword(), foundUser.getPassword()
		)) {
			log.debug("Authentication succeeded for email {}", user.getEmail());
			return foundUser;
		}
		log.debug("Authentication failed for email {}", user.getEmail());
		throw new AuthenticationFailedException(user);
	}

}
