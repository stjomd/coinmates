package at.stjomd.coinmatesserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.repository.refresh.Refreshable;


public interface BillRepository
extends JpaRepository<Bill, Integer>, Refreshable {

	Optional<Bill> findById(Integer id);

}
