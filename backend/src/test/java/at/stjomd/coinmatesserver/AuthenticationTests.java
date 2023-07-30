package at.stjomd.coinmatesserver;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import at.stjomd.coinmatesserver.entity.dto.LoginDetailsDto;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Authentication Tests")
public class AuthenticationTests {

	private final String AUTH_URI = "/api/v1/auth";

	@Autowired private MockMvc mockMvc;

	@Test
	@DisplayName("Should return with 401 if invalid credentials")
	void should401_whenInvalidCredentials() throws Exception {
		LoginDetailsDto loginDto = new LoginDetailsDto();
		loginDto.setEmail("hello@hei.at");
		loginDto.setPassword("12345");
		// Map to JSON string (cannot use mapper because password is excluded)
		String loginJson = String.format(
			"{\"email\":\"%s\",\"password\":\"%s\"}",
			loginDto.getEmail(),
			loginDto.getPassword()
		);
		// Perform request
		MvcResult result = mockMvc.perform(
			MockMvcRequestBuilders.post(AUTH_URI + "/login")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(loginJson)
		).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertEquals(401, response.getStatus());
	}

}
