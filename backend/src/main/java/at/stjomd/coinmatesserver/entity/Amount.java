package at.stjomd.coinmatesserver.entity;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Amount {

	@NotNull(message = "Integer part must be present")
	@PositiveOrZero(message = "Integer part must be at least 0")
	private Integer integer;

	@NotNull(message = "Fractional part must be present")
	@PositiveOrZero(message = "Fractional part must be at least 0")
	@Max(value = 99, message = "Fractional part must be at most 99")
	private Integer fraction;

}
