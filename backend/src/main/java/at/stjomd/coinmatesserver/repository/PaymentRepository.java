package at.stjomd.coinmatesserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import at.stjomd.coinmatesserver.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}
