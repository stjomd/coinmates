package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import at.stjomd.coinmatesserver.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public User getUser(Integer id) throws NotFoundException {
		log.trace("getUser(id = {})", id);
		return userRepository.findById(id)
			.orElseThrow(() ->
				new NotFoundException("No user found with ID: " + id)
			);
	}

	@Override
	public Set<User> getUsers(Collection<Integer> ids) {
		log.trace("getUsers(ids = {})", ids);
		return userRepository.findAllByIdIn(ids);
	}

	@Override
	public User getUser(String email) throws NotFoundException {
		log.trace("getUser(email = {})", email);
		return userRepository.findByEmail(email)
			.orElseThrow(() ->
				new NotFoundException("No user found with email: " + email)
			);
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

	@Override
	public Set<User> getFriends(Integer id) throws NotFoundException {
		User user = userRepository.findById(id)
			.orElseThrow(() ->
				new NotFoundException("No user found with ID: " + id)
			);
		return user.getFriends();
	}

	@Override
	@Transactional
	public Set<User> addFriend(Integer id, Integer friendId)
	throws NotFoundException {
		log.trace("addFriend(id = {}, friendId = {})", id, friendId);
		if (id == friendId) {
			throw new IllegalArgumentException(
				"Attempted to add self as friend: id = " + id
			);
		}
		try {
			User user = userRepository.findById(id).orElseThrow();
			User friendUser = userRepository.findById(friendId).orElseThrow();
			user.getFriends().add(friendUser);
			friendUser.getFriends().add(user);
			userRepository.save(user);
			userRepository.save(friendUser);
			return user.getFriends();
		} catch (NoSuchElementException exc) {
			throw new NotFoundException("No user found with ID: " + id, exc);
		}
	}

	@Override
	public Set<Bill> getBillsCreatedByUser(Integer id)
	throws NotFoundException {
		User user = getUser(id);
		return user.getCreatedBills();
	}

	@Override
	public Set<Bill> getBillsAssignedToUser(Integer id)
	throws NotFoundException {
		User user = getUser(id);
		return user.getAssignedBills();
	}

	@Override
	public List<Bill> getAllBillsForUser(Integer id) throws NotFoundException {
		User user = getUser(id);
		List<Bill> union = new ArrayList<>(user.getCreatedBills());
		union.addAll(user.getAssignedBills());
		Collections.sort(union,
			(a, b) -> 1 - a.getCreationDate().compareTo(b.getCreationDate())
		);
		return union;
	}

}
