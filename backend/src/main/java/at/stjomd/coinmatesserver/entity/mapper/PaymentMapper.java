package at.stjomd.coinmatesserver.entity.mapper;

import org.mapstruct.Mapper;
import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.dto.PaymentDto;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

	PaymentDto toDto(Payment entity);
	Payment toEntity(PaymentDto dto);

}
