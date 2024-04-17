package fi.ishtech.practice.books.controller;

import java.math.BigDecimal;
import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fi.ishtech.practice.books.payload.BookVo;
import fi.ishtech.practice.books.service.BookService;
import fi.ishtech.practice.books.spec.BookSpec;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

/**
 *
 * @author Muneer Ahmed Syed
 */
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.HEAD, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.TRACE })
@Slf4j
public class BookController {

	@Autowired
	private BookService bookService;

	// @formatter:off
	@Operation(summary = "Search for books with pagination and sorting")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = Page.class)))
	})
	// @formatter:on
	@GetMapping(path = "/api/v1/books", produces = MediaType.APPLICATION_JSON_VALUE)
	// @formatter:off
	public ResponseEntity<Page<BookVo>> search(
			@RequestParam(required = false) Long id,
			@RequestParam(required = false) String title,
			@RequestParam(required = false) String author,
			@RequestParam(required = false) Integer minYear,
			@RequestParam(required = false) Integer maxYear,
			@RequestParam(required = false) BigDecimal minPrice,
			@RequestParam(required = false) BigDecimal maxPrice,
			Pageable pageable
			) {
		return ResponseEntity.ok(bookService.findAllAndMapToVo(
				BookSpec.of(id, title, author, minYear, maxYear, minPrice, maxPrice),
				pageable));
	}
	// @formatter:on

	// @formatter:off
	@Operation(summary = "Get Book by ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = BookVo.class))),
			@ApiResponse(responseCode = "404", description = "Not Found",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = ErrorResponse.class)))
	})
	// @formatter:on
	@GetMapping(path = "/api/v1/books/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BookVo> findById(@PathVariable Long id) {
		return ResponseEntity.ok(bookService.findByIdAndMapToVo(id));
	}

	// @formatter:off
	@Operation(summary = "Create new Book")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = BookVo.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = ErrorResponse.class)))
	})
	@PostMapping(path = "/api/v1/books",
		consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @formatter:on
	public ResponseEntity<Long> createNew(@Valid @RequestBody BookVo book) {
		log.debug("Creating new Book {}", book.getTitle());

		BookVo bookVo = bookService.createNew(book);

		// @formatter:off
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/api/v1/books/{bookId}")
				.buildAndExpand(bookVo.getId())
				.toUri();
		// @formatter:on

		return ResponseEntity.created(uri).body(bookVo.getId());
	}

	// @formatter:off
	@Operation(summary = "Delete existing Book")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = BookVo.class))),
			@ApiResponse(responseCode = "404", description = "Not Found",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = ErrorResponse.class)))
	})
	// @formatter:on
	@DeleteMapping(path = "/api/v1/books/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		log.debug("Deleting Book({})", id);

		bookService.deleteById(id);

		return new ResponseEntity<Void>(HttpStatus.GONE);
	}

	// @formatter:off
	@Operation(summary = "Update existing Book")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = BookVo.class))),
			@ApiResponse(responseCode = "404", description = "Not Found",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request",
					content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
						schema = @Schema(implementation = ErrorResponse.class)))
	})
	@PutMapping(path = "/api/v1/books",
		consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	// @formatter:on
	public ResponseEntity<BookVo> update(@Valid @RequestBody BookVo book) {
		log.debug("Updating Book({})", book.getId());

		return ResponseEntity.ok(bookService.findAndUpdate(book));
	}

}
