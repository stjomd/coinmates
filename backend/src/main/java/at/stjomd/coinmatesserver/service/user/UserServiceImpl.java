package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
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

}
