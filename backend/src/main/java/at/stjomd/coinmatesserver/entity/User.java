package at.stjomd.coinmatesserver.entity;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {

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

	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "creator")
	private Set<Bill> createdBills;

	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "people")
	private Set<Bill> assignedBills;

	// ----- UserDetails -------------------------------------------------------

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO: hook user roles
		return Set.of();
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return status != Status.DELETED;
	}

	@Override
	public boolean isAccountNonLocked() {
		return status != Status.DELETED;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return status != Status.DELETED;
	}

}
