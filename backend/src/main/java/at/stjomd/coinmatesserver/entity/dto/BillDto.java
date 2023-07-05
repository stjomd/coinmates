package at.stjomd.coinmatesserver.entity.dto;

import java.util.Date;
import java.util.Set;

import at.stjomd.coinmatesserver.entity.Amount;
import lombok.Data;

@Data
public class BillDto {

	private Integer id;

	private String title;

	private String description;

	private Amount amount;

	private FriendDto creator;

	private Set<FriendDto> people;

	private Date creationDate;

}
