package at.stjomd.coinmatesserver.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

import at.stjomd.coinmatesserver.repository.UserRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	/**
	 * Address of the frontend. Use with CrossOrigin annotation to allow
	 * requests from the frontend.
	 */
	public static final String FRONTEND_ORIGIN = "http://localhost:5173";

	/**
	 * Address of the frontend. Use with CrossOrigin annotation to allow
	 * requests from the frontend.
	 */
	public static final String FRONTEND_ORIGIN_IP = "http://127.0.0.1:5173";

	private UserRepository userRepository;

	public SecurityConfig(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	UserDetailsService userDetailsService() {
		return (email) -> userRepository.findByEmail(email)
		.orElseThrow(() ->
			new UsernameNotFoundException("No user with email " + email + " exists")
		);
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http)
	throws Exception {
		return http
			.authorizeHttpRequests(ahr -> ahr
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.requestMatchers("/api/v1/auth/**").permitAll()
				.anyRequest().authenticated()
			)
			.headers(headers -> headers
				.addHeaderWriter(new StaticHeadersWriter(
					"Access-Control-Allow-Origin", FRONTEND_ORIGIN
				))
				.addHeaderWriter(new StaticHeadersWriter(
					"Access-Control-Allow-Credentials", "true"
				))
			)
			.csrf(csrf -> csrf.disable())
			.build();
	}

	@Bean
	LogoutHandler logoutHandler() {
		SecurityContextLogoutHandler sclh = new SecurityContextLogoutHandler();
		sclh.setClearAuthentication(true);
		sclh.setInvalidateHttpSession(true);
		return sclh;
	}

}
