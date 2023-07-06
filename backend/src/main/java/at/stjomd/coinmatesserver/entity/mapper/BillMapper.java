package at.stjomd.coinmatesserver.entity.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.dto.BillDto;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BillMapper {

	BillDto toDto(Bill entity);
	Bill toEntity(BillDto dto);

	Set<BillDto> toDtos(Set<Bill> entities);
	List<BillDto> toDtos(List<Bill> entities);

}
