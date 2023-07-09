package at.stjomd.coinmatesserver.controller;

import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/test")
public class TestController {

	@GetMapping
	public String hello() {
		return "Hello, world!";
	}

	@PostMapping("/login")
	public String login(
		@Valid @RequestBody LoginDetailsDto form, BindingResult bindingResult,
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
		return user.toString();
	}

}
