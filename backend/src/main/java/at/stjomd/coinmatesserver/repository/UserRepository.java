package at.stjomd.coinmatesserver.repository;

import at.stjomd.coinmatesserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findById(Integer id);

	Set<User> findAllByIdIn(Collection<Integer> ids);

	Optional<User> findByEmail(String email);

}
