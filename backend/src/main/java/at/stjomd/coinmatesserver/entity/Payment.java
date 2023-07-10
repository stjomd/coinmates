package at.stjomd.coinmatesserver.entity;

import java.util.Date;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.EAGER)
	private User user;

	@ManyToOne(fetch = FetchType.EAGER)
	private Bill bill;

	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name = "integer",
			column = @Column(name = "amount_integer", nullable = false)
		),
		@AttributeOverride(name = "fraction",
			column = @Column(name = "amount_fraction", nullable = false)
		)
	})
	private Amount amount;

	@Column(nullable = false)
	private Date date;

}
