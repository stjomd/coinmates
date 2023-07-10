package at.stjomd.coinmatesserver.entity.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.dto.BillDto;

@Mapper(
	componentModel = "spring", uses = {UserMapper.class, PaymentMapper.class}
)
public interface BillMapper {

	BillDto toDto(Bill entity);

	@Mapping(target = "payments", ignore = true)
	Bill toEntity(BillDto dto);

	Set<BillDto> toDtos(Set<Bill> entities);
	List<BillDto> toDtos(List<Bill> entities);

	default Integer map(Bill bill) {
		return bill.getId();
	}

	default Bill map(Integer billId) {
		return Bill.builder().id(billId).build();
	}

}
