package at.stjomd.coinmatesserver.entity;

import java.util.Date;

import lombok.Data;

@Data
public class ErrorBody {

	private Date date;

	private Integer status;

	private String message;

}
