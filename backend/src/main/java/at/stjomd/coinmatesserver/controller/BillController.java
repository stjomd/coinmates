package at.stjomd.coinmatesserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.service.bill.BillService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/bills")
public class BillController {

	private final BillService billService;

	public BillController(BillService billService) {
		this.billService = billService;
	}

	@GetMapping("/split")
	@ResponseStatus(HttpStatus.OK)
	public Amount previewSplitAmount(Amount amount, Integer people) {
		log.info(
			"GET /api/v1/bills/split ? integer={} & fraction={} & people={}",
			amount.getInteger(), amount.getFraction(), people
		);
		return billService.calculateSplitAmount(amount, people);
	}

}
