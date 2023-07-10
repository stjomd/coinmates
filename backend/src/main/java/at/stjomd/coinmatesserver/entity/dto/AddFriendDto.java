package at.stjomd.coinmatesserver.entity.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class AddFriendDto {

	@NotNull(message = "ID must be present")
	@PositiveOrZero(message = "ID cannot be negative")
	private Integer id;

}
