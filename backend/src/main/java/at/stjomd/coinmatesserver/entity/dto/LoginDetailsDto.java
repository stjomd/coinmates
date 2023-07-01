package at.stjomd.coinmatesserver.entity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDetailsDto {

	@NotNull @Email
	private String email;

	@NotNull
	private String password;

}
