package at.stjomd.coinmatesserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.dto.BillDto;
import at.stjomd.coinmatesserver.entity.mapper.BillMapper;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.service.bill.BillService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/bills")
public class BillController {

	private final BillService billService;
	private final BillMapper billMapper;

	public BillController(BillService billService, BillMapper billMapper) {
		this.billService = billService;
		this.billMapper = billMapper;
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

	@GetMapping("/:id")
	@ResponseStatus(HttpStatus.OK)
	public BillDto getBill(Integer id) throws NotFoundException {
		log.info("GET /api/v1/bills/{}", id);
		return billMapper.toDto(billService.getBill(id));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BillDto createBill(@Valid @RequestBody BillDto billDto) {
		log.info("POST /api/v1/bills: {}", billDto);
		Bill createdBill = billService.createBill(billMapper.toEntity(billDto));
		return billMapper.toDto(createdBill);
	}

}
