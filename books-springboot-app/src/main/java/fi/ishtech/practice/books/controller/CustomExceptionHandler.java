package fi.ishtech.practice.books.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.extern.slf4j.Slf4j;

/**
 *
 * @author Muneer Ahmed Syed
 */
@ControllerAdvice
@Slf4j
public class CustomExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
		log.trace("Handling Exception: {}", ex);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage()));
	}

}
