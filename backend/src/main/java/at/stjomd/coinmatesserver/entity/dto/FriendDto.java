package at.stjomd.coinmatesserver.entity.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class FriendDto {

	@NotNull(message = "ID must be present")
	@Positive(message = "ID must be positive")
	private Integer id;

	private String firstName;

	private String lastName;

}
