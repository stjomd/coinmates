package at.stjomd.coinmatesserver.entity;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 100, nullable = false)
	private String title;

	@Column(length = 1000, nullable = true)
	private String description;

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

	@ManyToOne(fetch = FetchType.EAGER)
	private User creator;

	@ManyToMany
	private Set<User> people;

	private Date creationDate;

}
