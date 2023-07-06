package at.stjomd.coinmatesserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import at.stjomd.coinmatesserver.entity.Bill;


public interface BillRepository extends JpaRepository<Bill, Integer> {

	Optional<Bill> findById(Integer id);

}
