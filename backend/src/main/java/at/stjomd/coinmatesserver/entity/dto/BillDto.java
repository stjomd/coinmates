package at.stjomd.coinmatesserver.entity.dto;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import at.stjomd.coinmatesserver.entity.Amount;
import at.stjomd.coinmatesserver.entity.Bill.Status;
import jakarta.validation.Valid;
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
	@Size(max = 100, message = "Title must be at most 100 characters long")
	private String title;

	@Size(max = 1000, message = "Description must be at most 1000 characters long")
	private String description;

	@Valid
	@NotNull(message = "Amount must be present")
	private Amount amount;

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Amount splitAmount;

	@Valid
	@NotNull(message = "Creator must be present")
	private UserShortDto creator;

	@NotNull(message = "Assigned people must be present")
	@Size(min = 1, message = "Assigned people must include at least one person")
	private Set<@Valid UserShortDto> people;

	@Past(message = "Creation date must be in the past")
	private Date creationDate;

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Status status;

}
