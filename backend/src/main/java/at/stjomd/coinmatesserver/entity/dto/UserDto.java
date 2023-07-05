package at.stjomd.coinmatesserver.entity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import at.stjomd.coinmatesserver.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {

	@Positive
	private Integer id;

	@NotNull(message = "Email must be present")
	@Email(message = "Email is invalid")
	@Size(max = 100, message = "Email must be at most 100 characters long")
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotNull(message = "Password must be present")
	@Size(min = 10, message = "Password must be at least 10 characters long")
	@Size(max = 50, message = "Password must be at most 50 characters long")
	private String password;

	@NotBlank(message = "First name must be present")
	@Size(max = 100, message = "First name must be at most 100 characters long")
	private String firstName;

	@NotBlank(message = "Last name must be present")
	@Size(max = 100, message = "Last name must be at most 100 characters long")
	private String lastName;

	private User.Role role;

	private User.Status status;

}
