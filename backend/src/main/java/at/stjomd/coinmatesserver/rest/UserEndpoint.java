package at.stjomd.coinmatesserver.rest;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import at.stjomd.coinmatesserver.mapper.UserMapper;
import at.stjomd.coinmatesserver.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserEndpoint {

    private final UserService userService;
    private final UserMapper userMapper;

    @Autowired
    public UserEndpoint(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto register(@RequestBody UserDto userDto) {
        User user = userMapper.entity(userDto);
        User registeredUser = userService.register(user);
        return userMapper.dto(registeredUser);
    }

    @PostMapping("auth")
    @ResponseStatus(HttpStatus.OK)
    public String authenticate(@RequestBody UserDto userDto) {
        User user = userMapper.entity(userDto);
        return userService.authenticate(user);
    }

}
