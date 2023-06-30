package at.stjomd.coinmatesserver.entity.mapper;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;
import at.stjomd.coinmatesserver.entity.dto.UserDto;

import org.mapstruct.BeanMapping;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
@DecoratedWith(HidePasswordDecorator.class)
public interface UserMapper {

    User toEntity(UserDto dto);
	UserDto toDto(User entity);

	@BeanMapping(ignoreByDefault = true)
	@Mapping(source = "email", target = "email")
	@Mapping(source = "password", target = "password")
	User toEntity(LoginDetailsDto dto);

}
