package at.stjomd.coinmatesserver.entity.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.dto.BillDto;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BillMapper {

	@Mapping(source = "creator", target = "creatorId")
	@Mapping(source = "people", target = "peopleIds")
	BillDto toDto(Bill entity);

	@Mapping(source = "creatorId", target = "creator")
	@Mapping(source = "peopleIds", target = "people")
	Bill toEntity(BillDto dto);

}
