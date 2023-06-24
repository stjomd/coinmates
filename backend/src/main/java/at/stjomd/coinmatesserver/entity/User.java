package at.stjomd.coinmatesserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
@Entity
@Table(name = "_user")
public class User {

    enum Role implements GrantedAuthority {
        REGULAR, ADMIN;
        @Override public String getAuthority() { return toString(); }
    }

    enum Status {
        ACTIVE, RESTRICTED, DELETED
    }

    @Id
    @GeneratedValue
    private Integer id;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 500, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

}
