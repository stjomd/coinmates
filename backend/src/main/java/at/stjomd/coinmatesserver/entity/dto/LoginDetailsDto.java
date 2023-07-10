package at.stjomd.coinmatesserver.entity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDetailsDto {

	@NotNull(message = "Email must be present")
	@Email(message = "Email is invalid")
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotNull(message = "Password must be present")
	private String password;

}
