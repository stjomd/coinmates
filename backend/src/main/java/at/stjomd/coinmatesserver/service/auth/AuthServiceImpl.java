package at.stjomd.coinmatesserver.service.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import at.stjomd.coinmatesserver.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthServiceImpl(
		UserRepository userRepository, PasswordEncoder passwordEncoder
	) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User login(User user, HttpServletRequest request)
	throws AuthenticationFailedException {
		log.trace("login(user.email = {})", user.getEmail());
		try {
			request.login(user.getEmail(), user.getPassword());
		} catch (ServletException exception) {
			exception.printStackTrace();
			throw new AuthenticationFailedException(
				"Invalid username or password", exception
			);
		}
		Authentication auth = (Authentication) request.getUserPrincipal();
		User principal = (User) auth.getPrincipal();
		return principal;
	}

	@Override
	public User register(User user, HttpServletRequest request)
	throws UserAlreadyExistsException {
		log.trace("register(user.email = {})", user.getEmail());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		// Check that no user with the same email exists
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException(user);
		}
		user.setRole(User.Role.REGULAR);
		user.setStatus(User.Status.ACTIVE);
		return userRepository.save(user);
	}

}
