package at.stjomd.coinmatesserver.entity.mapper;

import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.UserDto;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
@DecoratedWith(HidePasswordDecorator.class)
public interface UserMapper {

    User toEntity(UserDto dto);
    UserDto toDto(User entity);

}
