package at.stjomd.coinmatesserver.entity.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import at.stjomd.coinmatesserver.entity.Bill;
import at.stjomd.coinmatesserver.entity.Payment;
import at.stjomd.coinmatesserver.entity.User;
import at.stjomd.coinmatesserver.entity.dto.PaymentDto;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

	@Mapping(source = "user", target = "userId")
	@Mapping(source = "bill", target = "billId")
	PaymentDto toDto(Payment entity);

	@Mapping(source = "userId", target = "user")
	@Mapping(source = "billId", target = "bill")
	Payment toEntity(PaymentDto dto);

	default Integer map(User user) {
		return user.getId();
	}
	default Integer map(Bill bill) {
		return bill.getId();
	}

	default User mapToUser(Integer userId) {
		return User.builder().id(userId).build();
	}
	default Bill mapToBill(Integer billId) {
		return Bill.builder().id(billId).build();
	}

}
