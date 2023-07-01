package at.stjomd.coinmatesserver.entity.dto;

import java.util.Date;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class PaymentDto {

	private Integer id;

	@NotNull
	private UserDto sender;

	@NotNull
	private UserDto recepient;

	@NotNull
	@PositiveOrZero
	private Integer amountInteger;

	@NotNull
	@PositiveOrZero @Max(99)
	private Integer amountFraction;

	@NotNull
	private Date creationDate;

	private Date resolvementDate;

}
