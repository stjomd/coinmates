package at.stjomd.coinmatesserver.entity.mapper;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.UserShortDto;
import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import java.util.Set;
import org.mapstruct.BeanMapping;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
@DecoratedWith(HidePasswordDecorator.class)
public interface UserMapper {

	// ----- UserDto -----------------------------------------------------------

	@Mapping(target = "friends", ignore = true)
	@Mapping(target = "createdBills", ignore = true)
	@Mapping(target = "assignedBills", ignore = true)
	User toEntity(UserDto dto);

	UserDto toDto(User entity);

	// ----- LoginDetailsDto ---------------------------------------------------

	@BeanMapping(ignoreByDefault = true)
	@Mapping(source = "email", target = "email")
	@Mapping(source = "password", target = "password")
	User toEntity(LoginDetailsDto dto);

	// ----- UserShortDto ------------------------------------------------------

	@BeanMapping(ignoreByDefault = true)
	@Mapping(source = "id", target = "id")
	User toUser(UserShortDto shortDto);

	UserShortDto toShortDto(User user);

	Set<UserShortDto> toShortDtos(Set<User> entities);
	Set<User> toEntities(Set<UserShortDto> shortDtos);

	// ----- Integer IDs -------------------------------------------------------

	default Integer map(User user) {
		return user.getId();
	}

	default User map(Integer id) {
		return User.builder().id(id).build();
	}

}
