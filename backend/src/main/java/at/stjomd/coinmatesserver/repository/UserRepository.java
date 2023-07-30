package at.stjomd.coinmatesserver.repository;

import at.stjomd.coinmatesserver.entity.User;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findById(Integer id);

	Set<User> findAllByIdIn(Collection<Integer> ids);

	Optional<User> findByEmail(String email);

	/**
	 * Retrieves entities where first name, last name, or email, contain the
	 * specified parameters. Case is ignored.
	 * @param firstName the first name query.
	 * @param lastName the last name query.
	 * @param email the email query.
	 * @param page the page request instance.
	 * @return a set of user entities.
	 */
	Set<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
		String firstName, String lastName, String email, PageRequest page
	);

}
