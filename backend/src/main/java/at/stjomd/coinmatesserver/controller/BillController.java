package at.stjomd.coinmatesserver.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.BillDto;
import at.stjomd.coinmatesserver.entity.dto.PaymentDto;
import at.stjomd.coinmatesserver.entity.mapper.BillMapper;
import at.stjomd.coinmatesserver.entity.mapper.PaymentMapper;
import at.stjomd.coinmatesserver.exception.AccessForbiddenException;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.security.SecurityConfig;
import at.stjomd.coinmatesserver.service.bill.BillService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/bills")
@CrossOrigin(origins = {
	SecurityConfig.FRONTEND_ORIGIN, SecurityConfig.FRONTEND_ORIGIN_IP
})
public class BillController {

	private final BillService billService;
	private final BillMapper billMapper;
	private final PaymentMapper paymentMapper;

	public BillController(
		BillService billService,
		BillMapper billMapper,
		PaymentMapper paymentMapper
	) {
		this.billService = billService;
		this.billMapper = billMapper;
		this.paymentMapper = paymentMapper;
	}

	@GetMapping("/split")
	@ResponseStatus(HttpStatus.OK)
	public Amount previewSplitAmount(Amount amount, Integer people) {
		log.info(
			"GET /api/v1/bills/split?integer={}&fraction={}&people={}",
			amount.getInteger(), amount.getFraction(), people
		);
		return billService.calculateSplitAmount(amount, people);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public BillDto getBill(
		@PathVariable Integer id,
		@AuthenticationPrincipal User authenticatedUser
	) throws AccessForbiddenException, NotFoundException {
		log.info("GET /api/v1/bills/{}", id);
		return billMapper.toDto(billService.getBill(id, authenticatedUser));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BillDto createBill(
		@Valid @RequestBody BillDto billDto,
		@AuthenticationPrincipal User authenticatedUser
	) throws AccessForbiddenException {
		log.info("POST /api/v1/bills: {}", billDto);
		Bill createdBill = billService.createBill(
			billMapper.toEntity(billDto), authenticatedUser
		);
		return billMapper.toDto(createdBill);
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<BillDto> getAllBillsForUser(@AuthenticationPrincipal User user)
	throws NotFoundException {
		log.info("GET /api/v1/bills");
		List<Bill> bills = billService.getAllBillsForUser(user.getId());
		return billMapper.toDtos(bills);
	}

	@PostMapping("/{billId}/payments")
	@ResponseStatus(HttpStatus.CREATED)
	public PaymentDto submitPayment(
		@PathVariable Integer billId,
		@Valid @RequestBody PaymentDto paymentDto,
		@AuthenticationPrincipal User authenticatedUser
	) throws AccessForbiddenException, NotFoundException {
		log.info("POST /api/v1/bills/{}/payments: {}", billId, paymentDto);
		Payment entity = paymentMapper.toEntity(paymentDto);
		Payment saved = billService.submitPayment(entity, authenticatedUser);
		return paymentMapper.toDto(saved);
	}

}
