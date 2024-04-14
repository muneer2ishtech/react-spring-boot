package fi.ishtech.practice.books.controller;

import java.math.BigDecimal;
import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fi.ishtech.practice.books.entity.Book;
import fi.ishtech.practice.books.payload.BookVo;
import fi.ishtech.practice.books.service.BookService;
import fi.ishtech.practice.books.spec.BookSpec;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

/**
 *
 * @author Muneer Ahmed Syed
 */
@RestController
@Slf4j
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping("/api/v1/books")
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

	@GetMapping("/api/v1/books/{id}")
	public ResponseEntity<Book> findById(@PathVariable Long id) {
		return ResponseEntity.of(bookService.findById(id));
	}

	@PostMapping("/api/v1/books")
	public ResponseEntity<?> createNew(@Valid @RequestBody Book book) {
		log.debug("Creating new Book {}", book.getTitle());

		book = bookService.create(book);

		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/books/{bookId}")
				.buildAndExpand(book.getId()).toUri();

		return ResponseEntity.created(uri).body(book.getId());
	}

	@DeleteMapping("/api/v1/books/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		log.debug("Deleting Book({})", id);

		bookService.deleteById(id);

		return new ResponseEntity<Void>(HttpStatus.GONE);
	}

	@PutMapping("/api/v1/books")
	public ResponseEntity<?> update(@Valid @RequestBody Book book) {
		log.debug("Updating Book({})", book.getId());

		book = bookService.update(book);

		return ResponseEntity.ok(book);
	}

}
