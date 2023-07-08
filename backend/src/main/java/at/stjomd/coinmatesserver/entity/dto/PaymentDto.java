package at.stjomd.coinmatesserver.entity.dto;

import java.util.Date;

import at.stjomd.coinmatesserver.entity.Amount;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

@Data
public class PaymentDto {

	private Integer id;

	@NotNull
	private Integer userId;

	@NotNull
	private Integer billId;

	@NotNull
	@Valid
	private Amount amount;

	@NotNull
	@Past
	private Date date;

}
