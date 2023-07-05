package at.stjomd.coinmatesserver.entity;

import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Builder
@Entity
@Table(name = "_user")
public class User {

	public enum Role {
		REGULAR, ADMIN
	}

	public enum Status {
		ACTIVE, RESTRICTED, DELETED
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 100, nullable = false)
	private String email;

	@Column(length = 500, nullable = false)
	private String password;

	@Column(length = 100, nullable = false)
	private String firstName;

	@Column(length = 100, nullable = false)
	private String lastName;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;

	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@ManyToMany(fetch = FetchType.LAZY)
	private Set<User> friends;

}
