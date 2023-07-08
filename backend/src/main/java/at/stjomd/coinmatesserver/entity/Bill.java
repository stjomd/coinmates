package at.stjomd.coinmatesserver.entity;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bill {

	public enum Status {
		OPEN, CLOSED
	}

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

	@Transient
	private Amount splitAmount;

	@ManyToOne(fetch = FetchType.EAGER)
	private User creator;

	@ManyToMany(fetch = FetchType.EAGER)
	private Set<User> people;

	@Column(nullable = false)
	private Date creationDate;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;

	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "bill")
	private Set<Payment> payments;

}
