package at.stjomd.coinmatesserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import at.stjomd.coinmatesserver.entity.mapper.UserMapper;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import at.stjomd.coinmatesserver.security.SecurityConfig;
import at.stjomd.coinmatesserver.service.auth.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {SecurityConfig.FRONTEND_ORIGIN, SecurityConfig.FRONTEND_ORIGIN_IP})
public class AuthController {

	private final AuthService authService;
	private final UserMapper userMapper;

	public AuthController(AuthService authService, UserMapper userMapper) {
		this.authService = authService;
		this.userMapper = userMapper;
	}

	@PostMapping("/login")
	@ResponseStatus(HttpStatus.OK)
	public UserDto login(
		@Valid @RequestBody LoginDetailsDto details,
		HttpServletRequest request
	) throws AuthenticationFailedException {
		User user = userMapper.toEntity(details);
		return userMapper.toDto(authService.login(user, request));
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.OK)
	public UserDto register(
		@Valid @RequestBody UserDto userDto,
		HttpServletRequest request
	) throws UserAlreadyExistsException, AuthenticationFailedException {
		authService.register(userMapper.toEntity(userDto), request);
		User user = authService.login(userMapper.toEntity(userDto), request);
		return userMapper.toDto(user);
	}

}
