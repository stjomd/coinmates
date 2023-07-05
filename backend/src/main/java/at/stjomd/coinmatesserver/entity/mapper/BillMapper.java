package at.stjomd.coinmatesserver.entity.mapper;

import org.mapstruct.Mapper;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.dto.BillDto;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BillMapper {

	BillDto toDto(Bill entity);
	Bill toEntity(BillDto dto);

}
