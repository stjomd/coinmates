package at.stjomd.coinmatesserver.service.user;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.exception.AccessForbiddenException;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.Collection;
import java.util.Set;

import org.springframework.data.domain.PageRequest;
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
	public Set<User> getFriends(Integer id, User authenticatedUser)
	throws AccessForbiddenException, NotFoundException {
		if (!id.equals(authenticatedUser.getId())) {
			throw new AccessForbiddenException(
				"Attempted to retrieve friends of other user"
			);
		}
		User user = userRepository.findById(id)
			.orElseThrow(() ->
				new NotFoundException("No user found with ID: " + id)
			);
		return user.getFriends();
	}

	@Override
	@Transactional
	public Set<User> addFriend(
		Integer id, Integer friendId, User authenticatedUser
	) throws AccessForbiddenException, NotFoundException {
		log.trace("addFriend(id = {}, friendId = {})", id, friendId);
		if (!id.equals(authenticatedUser.getId())) {
			throw new AccessForbiddenException(
				"Attempted to add friend to other user"
			);
		}
		if (id.equals(friendId)) {
			throw new IllegalArgumentException(
				"Attempted to add self as friend: id = " + id
			);
		}
		User user = userRepository.findById(id)
			.orElseThrow(() ->
				new NotFoundException("No user found with ID: " + id)
			);
		User friendUser = userRepository.findById(friendId)
			.orElseThrow(() ->
				new NotFoundException("No user found with ID: " + friendId)
			);
		user.getFriends().add(friendUser);
		friendUser.getFriends().add(user);
		return user.getFriends();
	}

	@Override
	public Set<User> searchUsers(String query) {
		log.trace("searchUsers({})", query);
		if (query.length() < 1) {
			return Set.of();
		}
		return userRepository
			.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
				query, query, query, PageRequest.of(0, 10)
			);
	}

}
