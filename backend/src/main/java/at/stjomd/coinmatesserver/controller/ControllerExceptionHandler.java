package at.stjomd.coinmatesserver.controller;

import at.stjomd.coinmatesserver.entity.ErrorBody;
import at.stjomd.coinmatesserver.entity.dto.ErrorBodyDto;
import at.stjomd.coinmatesserver.entity.mapper.ErrorBodyMapper;
import at.stjomd.coinmatesserver.exception.AuthenticationFailedException;
import at.stjomd.coinmatesserver.exception.UserAlreadyExistsException;
import lombok.extern.slf4j.Slf4j;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

	private ErrorBodyMapper errorMapper;

	public ControllerExceptionHandler(ErrorBodyMapper errorMapper) {
		this.errorMapper = errorMapper;
	}

	/**
	 * Constructs an error body DTO.
	 * @param exception the exception that caused the error.
	 * @param status the HTTP status corresponding to the error.
	 * @return an error body DTO.
	 */
	private ErrorBodyDto errorBody(Throwable exception, HttpStatus status) {
		ErrorBody body = new ErrorBody(
			new Date(),
			status.value(),
			status.getReasonPhrase(),
			exception.getMessage()
		);
		return errorMapper.toDto(body);
	}

	/**
	 * Logs the intercepted exception and its message.
	 * @param exception the cause exception.
	 */
	private void log(Throwable exception) {
		log.warn(
			"{}: {}",
			exception.getClass().getSimpleName(),
			exception.getMessage()
		);
	}

	// Authentication Fail
	@ExceptionHandler(value = {AuthenticationFailedException.class})
	protected ResponseEntity<Object> handleAuthFailed(
		AuthenticationFailedException exception, WebRequest request
	) {
		log(exception);
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		return handleExceptionInternal(
			exception,
			errorBody(exception, status),
			new HttpHeaders(),
			status,
			request
		);
	}

	// User Already Exists
	@ExceptionHandler(value = {UserAlreadyExistsException.class})
	protected ResponseEntity<Object> handleUserAlreadyExists(
		UserAlreadyExistsException exception, WebRequest request
	) {
		log(exception);
		HttpStatus status = HttpStatus.CONFLICT;
		return handleExceptionInternal(
			exception,
			errorBody(exception, status),
			new HttpHeaders(),
			status,
			request
		);
	}

	// Validation
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
		MethodArgumentNotValidException exception, HttpHeaders headers,
		HttpStatusCode status, WebRequest request
	) {
		log(exception);
		HttpStatus overriddenStatus = HttpStatus.UNPROCESSABLE_ENTITY;
		return handleExceptionInternal(
			exception,
			errorBody(exception, overriddenStatus),
			headers,
			overriddenStatus,
			request
		);
	}

}
