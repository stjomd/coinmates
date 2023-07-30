package at.stjomd.coinmatesserver.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
		log.info("POST /api/v1/auth/login: {}", details.getEmail());
		User user = userMapper.toEntity(details);
		return userMapper.toDto(authService.login(user, request));
	}

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.OK)
	public UserDto register(
		@Valid @RequestBody UserDto userDto,
		HttpServletRequest request
	) throws UserAlreadyExistsException, AuthenticationFailedException {
		log.info("POST /api/v1/auth/register: {}", userDto.getEmail());
		authService.register(userMapper.toEntity(userDto), request);
		User user = authService.login(userMapper.toEntity(userDto), request);
		return userMapper.toDto(user);
	}

	@PostMapping("/logout")
	@ResponseStatus(HttpStatus.OK)
	public void logout(
		@AuthenticationPrincipal User user,
		HttpServletRequest request
	) throws AuthenticationFailedException {
		if (user == null) {
			throw new AuthenticationFailedException("Already logged out");
		}
		log.info("POST /api/v1/auth/logout: {}", user.getEmail());
		LogoutHandler logoutHandler = new SecurityContextLogoutHandler();
		logoutHandler.logout(request, null, null);
	}

}
