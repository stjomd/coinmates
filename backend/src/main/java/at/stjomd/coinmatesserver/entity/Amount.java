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

	@NotNull
	@PositiveOrZero
	private Integer integer;

	@NotNull
	@PositiveOrZero @Max(99)
	private Integer fraction;

}
