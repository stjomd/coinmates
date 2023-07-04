package at.stjomd.coinmatesserver.entity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDetailsDto {

	@NotNull(message = "Email must be present")
	@Email(message = "Email is invalid")
	private String email;

	@NotNull(message = "Password must be present")
	private String password;

}
