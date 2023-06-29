package at.stjomd.coinmatesserver.entity.mapper;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Maps the password field to null in the DTO, to hide the hash.
 */
@Component
public abstract class HidePasswordDecorator implements UserMapper {

	@Autowired
	private UserMapper delegate;

	@Override
	public UserDto toDto(User entity) {
		UserDto mapped = delegate.toDto(entity);
		mapped.setPassword(null);
		return mapped;
	}

}
