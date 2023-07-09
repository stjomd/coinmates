package at.stjomd.coinmatesserver.controller;

import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import at.stjomd.coinmatesserver.entity.mapper.UserMapper;
import at.stjomd.coinmatesserver.security.SecurityConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {SecurityConfig.FRONTEND_ORIGIN, SecurityConfig.FRONTEND_ORIGIN_IP})
public class AuthController {

	private final UserMapper userMapper;

	public AuthController(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@PostMapping("/login")
	public UserDto login(
		@Valid @RequestBody LoginDetailsDto form,
		BindingResult bindingResult,
		HttpServletRequest request
	) throws Exception {
		if (bindingResult.hasErrors()) {
			throw new Exception("Invalid username or password");
		}
		try {
			request.login(form.getEmail(), form.getPassword());
		} catch (ServletException e) {
			throw new Exception("Invalid username or password");
		}
		var auth = (Authentication) request.getUserPrincipal();
		var user = (User) auth.getPrincipal();
		return userMapper.toDto(user);
	}

}
