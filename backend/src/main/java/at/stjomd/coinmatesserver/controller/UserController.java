package at.stjomd.coinmatesserver.controller;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.AddFriendDto;
import at.stjomd.coinmatesserver.entity.dto.UserShortDto;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import at.stjomd.coinmatesserver.exception.NotFoundException;
import at.stjomd.coinmatesserver.entity.mapper.UserMapper;
import at.stjomd.coinmatesserver.security.SecurityConfig;
import at.stjomd.coinmatesserver.service.user.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = {
	SecurityConfig.FRONTEND_ORIGIN, SecurityConfig.FRONTEND_ORIGIN_IP
})
public class UserController {

	private final UserService userService;
	private final UserMapper userMapper;

	public UserController(
		UserService userService, UserMapper userMapper
	) {
		this.userService = userService;
		this.userMapper = userMapper;
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UserDto getUser(@PathVariable Integer id)
	throws NotFoundException {
		log.info("GET /api/v1/users/{}", id);
		User user = userService.getUser(id);
		return userMapper.toDto(user);
	}

	@GetMapping("/{id}/friends")
	@ResponseStatus(HttpStatus.OK)
	public Set<UserShortDto> getFriends(@PathVariable Integer id)
	throws NotFoundException {
		log.info("GET /api/v1/users/{}/friends", id);
		return userMapper.toShortDtos(userService.getFriends(id));
	}

	@PatchMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Set<UserShortDto> addFriend(
		@PathVariable Integer id, @Valid @RequestBody AddFriendDto friendDto
	) throws NotFoundException {
		log.info("PATCH /api/v1/users/{}: friendId = {}", id, friendDto.getId());
		Set<User> friends = userService.addFriend(id, friendDto.getId());
		return userMapper.toShortDtos(friends);
	}

}
