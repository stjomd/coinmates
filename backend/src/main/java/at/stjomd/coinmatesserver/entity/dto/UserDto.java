package at.stjomd.coinmatesserver.entity.dto;

import at.stjomd.coinmatesserver.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {

    private Integer id;

	@NotNull @Email @Size(max = 100)
    private String email;

	@NotNull @Size(min = 10) @Size(max = 50)
    private String password;

	@NotBlank @Size(max = 100)
    private String firstName;

	@NotBlank @Size(max = 100)
    private String lastName;

    private User.Role role;

    private User.Status status;

}
