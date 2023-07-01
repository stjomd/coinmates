package at.stjomd.coinmatesserver.entity.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import at.stjomd.coinmatesserver.entity.ErrorBody;
import at.stjomd.coinmatesserver.entity.dto.ErrorBodyDto;

@Mapper(componentModel = "spring")
public interface ErrorBodyMapper {

	@Mapping(
		source = "date", target = "timestamp",
		dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
	)
	ErrorBodyDto toDto(ErrorBody errorBody);

}
