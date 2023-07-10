package at.stjomd.coinmatesserver.entity.mapper;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Maps the password field to null in the DTO, to hide the hash.
 * Although the password field is not serialized (by {@code @JsonProperty}
 * annotations), this decorator serves as protection still, in case the
 * annotation gets accidentaly removed.
 */
@Slf4j
@Component
public abstract class HidePasswordDecorator implements UserMapper {

	@Autowired
	private UserMapper delegate;

	@Override
	public UserDto toDto(User entity) {
		UserDto mapped = delegate.toDto(entity);
		mapped.setPassword(null);
		log.debug(
			"Hid the password while mapping to User DTO: email = {}",
			entity.getEmail()
		);
		return mapped;
	}

}
