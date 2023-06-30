package at.stjomd.coinmatesserver.controller;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExists;
import at.stjomd.coinmatesserver.entity.mapper.UserMapper;
import at.stjomd.coinmatesserver.security.SecurityConfig;
import at.stjomd.coinmatesserver.service.user.UserService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = SecurityConfig.frontendOrigin)
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto register(@Valid @RequestBody UserDto userDto)
    throws UserAlreadyExists {
        User user = userMapper.toEntity(userDto);
        User registeredUser = userService.register(user);
        return userMapper.toDto(registeredUser);
    }

    @PostMapping("auth")
    @ResponseStatus(HttpStatus.OK)
    public String authenticate(@RequestBody UserDto userDto)
    throws AuthenticationFailedException {
        User user = userMapper.toEntity(userDto);
        return userService.authenticate(user);
    }

}
