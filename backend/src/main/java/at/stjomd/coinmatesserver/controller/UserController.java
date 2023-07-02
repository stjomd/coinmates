package at.stjomd.coinmatesserver.controller;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import at.stjomd.coinmatesserver.entity.mapper.UserMapper;
import at.stjomd.coinmatesserver.security.SecurityConfig;
import at.stjomd.coinmatesserver.service.user.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
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

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UserDto getUser(@PathVariable Integer id)
	throws NotFoundException {
		log.info("GET /api/v1/user/{}", id);
		User user = userService.getUser(id);
		return userMapper.toDto(user);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public UserDto register(@Valid @RequestBody UserDto userDto)
	throws UserAlreadyExistsException {
		log.info("POST /api/v1/user: email = {}", userDto.getEmail());
		User user = userMapper.toEntity(userDto);
		User registeredUser = userService.register(user);
		return userMapper.toDto(registeredUser);
	}

	@PostMapping("/auth")
	@ResponseStatus(HttpStatus.OK)
	public UserDto authenticate(@Valid @RequestBody LoginDetailsDto loginDto)
	throws AuthenticationFailedException {
		log.info("POST /api/v1/user/auth: email = {}", loginDto.getEmail());
		User loginUser = userMapper.toEntity(loginDto);
		User registeredUser = userService.authenticate(loginUser);
		return userMapper.toDto(registeredUser);
	}

	@PatchMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Set<Integer> addFriend(
		@PathVariable Integer id, @RequestBody Integer friendId
	) throws NotFoundException {
		log.info("PATCH /api/v1/user/{}: add friend id {}");
		Set<User> friends = userService.addFriend(id, friendId);
		return friends.stream().map(User::getId).collect(Collectors.toSet());
	}

}
