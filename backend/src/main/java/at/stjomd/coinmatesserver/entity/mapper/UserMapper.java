package at.stjomd.coinmatesserver.entity.mapper;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.FriendDto;
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
	User toEntity(UserDto dto);

	UserDto toDto(User entity);

	// ----- LoginDetailsDto ---------------------------------------------------

	@BeanMapping(ignoreByDefault = true)
	@Mapping(source = "email", target = "email")
	@Mapping(source = "password", target = "password")
	User toUser(LoginDetailsDto dto);

	// ----- FriendDto ---------------------------------------------------------

	@BeanMapping(ignoreByDefault = true)
	@Mapping(source = "id", target = "id")
	User toUser(FriendDto friendDto);

	FriendDto toFriendDto(User user);

	Set<FriendDto> toFriendDtos(Set<User> entities);

	Set<User> toUsers(Set<FriendDto> friendDtos);

}
