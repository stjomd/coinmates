package at.stjomd.coinmatesserver.entity.dto;

import lombok.Data;

@Data
public class ErrorBodyDto {

	private String timestamp;

	private Integer status;

	private String statusText;

	private String message;

}
