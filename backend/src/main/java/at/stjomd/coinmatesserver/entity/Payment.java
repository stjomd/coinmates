package at.stjomd.coinmatesserver.entity;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
@Entity
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.EAGER)
	@NotNull
	private User sender;

	@ManyToOne(fetch = FetchType.EAGER)
	@NotNull
	private User recepient;

	@PositiveOrZero
	@NotNull
	private Integer amountInteger;

	@Max(99)
	@PositiveOrZero
	@NotNull
	private Integer amountFraction;

	@NotNull
	private Date creationDate;

	private Date resolvementDate;

}
