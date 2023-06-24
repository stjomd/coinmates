package at.stjomd.coinmatesserver.entity.dto;

import at.stjomd.coinmatesserver.entity.User;
import lombok.Data;

@Data
public class UserDto {

    private Integer id;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private User.Role role;

    private User.Status status;

}
