package at.stjomd.coinmatesserver.entity.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.dto.PaymentDto;

@Mapper(componentModel = "spring", uses = {UserMapper.class, BillMapper.class})
public interface PaymentMapper {

	@Mapping(source = "user", target = "userId")
	@Mapping(source = "bill", target = "billId")
	PaymentDto toDto(Payment entity);

	@Mapping(source = "userId", target = "user")
	@Mapping(source = "billId", target = "bill")
	Payment toEntity(PaymentDto dto);

}
