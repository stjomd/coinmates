package at.stjomd.coinmatesserver.entity.dto;

import java.util.Date;
import java.util.Set;

import at.stjomd.coinmatesserver.entity.Amount;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BillDto {

	@Positive(message = "ID must be positive")
	private Integer id;

	@NotBlank(message = "Title must be present")
	@Max(value = 100, message = "Title must be at most 100 characters long")
	private String title;

	@Max(value = 1000, message = "Description must be at most 1000 characters long")
	private String description;

	@NotNull(message = "Amount must be present")
	private Amount amount;

	@NotNull(message = "Creator ID must be present")
	@Positive(message = "ID must be positive")
	private Integer creatorId;

	@NotNull(message = "People IDs must be present")
	@Size(min = 1, message = "People IDs must include at least one ID")
	private Set<@Positive(message = "People IDs must be positive") Integer>
	peopleIds;

	@Past(message = "Creation date must be in the past")
	private Date creationDate;

}
