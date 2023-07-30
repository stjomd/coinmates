package at.stjomd.coinmatesserver;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.exception.ValidationFailedException;
import at.stjomd.coinmatesserver.repository.BillRepository;
import at.stjomd.coinmatesserver.repository.PaymentRepository;
import at.stjomd.coinmatesserver.service.bill.BillService;
import at.stjomd.coinmatesserver.service.bill.BillServiceImpl;
import at.stjomd.coinmatesserver.service.bill.BillServiceValidator;
import at.stjomd.coinmatesserver.service.user.UserService;

@SpringBootTest
@DisplayName("Bill Service")
class BillServiceTests {

	private BillService billService;

	@BeforeEach
	void beforeEach() {
		// Mock dependencies
		BillRepository billRepository = Mockito
			.mock(BillRepository.class);
		PaymentRepository paymentRepository = Mockito
			.mock(PaymentRepository.class);
		UserService userService = Mockito
			.mock(UserService.class);
		BillServiceValidator validator = Mockito
			.mock(BillServiceValidator.class);
		// Set up validator mock
		Mockito.doCallRealMethod()
			.when(validator).calculateSplitAmount(any(), any());
		// Initialize service
		billService = new BillServiceImpl(
			billRepository, paymentRepository, validator, userService
		);
	}

	@AfterEach
	void afterEach() {
		billService = null;
	}

	@Nested
	@DisplayName("Split Amount")
	class SplitAmount {

		@Test
		@DisplayName("Returns correct split amount")
		void shouldReturnCorrectSplitAmount() {
			Amount amount = new Amount(50, 55);
			Amount splitAmount = billService.calculateSplitAmount(amount, 2);
			System.out.println(splitAmount);
			assertAll(
				() -> assertEquals(25, splitAmount.getInteger()),
				() -> assertEquals(28, splitAmount.getFraction())
			);
		}

		@Test
		@DisplayName("Fails if amount is invalid")
		void shouldFail_whenAmountInvalid() {
			List<Amount> amounts = List.of(
				new Amount(-10, 50),
				new Amount(10, -50),
				new Amount(-50, -30),
				new Amount(10, 100)
			);
			assertAll(amounts.stream().map(amount -> {
				// Map each amount to an executable
				return () -> assertThrows(
					ValidationFailedException.class,
					() -> billService.calculateSplitAmount(amount, 3)
				);}
			));
		}

		@Test
		@DisplayName("Fails if people argument is invalid")
		void shouldFail_whenPeopleInvalid() {
			Amount amount = new Amount(50, 50);
			assertThrows(
				ValidationFailedException.class,
				() -> billService.calculateSplitAmount(amount, 0)
			);
		}

	}

}
