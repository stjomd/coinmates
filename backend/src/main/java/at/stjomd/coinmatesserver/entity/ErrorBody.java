package at.stjomd.coinmatesserver.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorBody {

	private Date date;

	private Integer status;

	private String statusText;

	private String message;

}
