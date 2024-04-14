package fi.ishtech.practice.books.controller;

import java.util.NoSuchElementException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
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

	@ExceptionHandler(NoSuchElementException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseEntity<ErrorResponse> handleNoSuchElementException(NoSuchElementException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(ErrorResponse.create(ex, HttpStatus.NOT_FOUND, ex.getMessage()));
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
		log.error("DB Constraint failed: {}", ex.getMessage());
		if (StringUtils.containsIgnoreCase(ex.getMessage(), "unique")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage()));
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ErrorResponse.create(ex, HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage()));
		}
	}

}
