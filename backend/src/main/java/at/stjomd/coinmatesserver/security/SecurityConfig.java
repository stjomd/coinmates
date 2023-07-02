package at.stjomd.coinmatesserver.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
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

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
