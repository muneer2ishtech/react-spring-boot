package fi.ishtech.practice.books.service.impl;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import fi.ishtech.practice.books.BookMapper;
import fi.ishtech.practice.books.entity.Book;
import fi.ishtech.practice.books.payload.BookVo;
import fi.ishtech.practice.books.repo.BookRepo;
import fi.ishtech.practice.books.service.BookService;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;

/**
 *
 * @author Muneer Ahmed Syed
 */
@Service
@Slf4j
@Transactional
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepo bookRepo;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private BookMapper bookMapper;

	private Page<Book> findAll(Specification<Book> spec, Pageable pageable) {
		return bookRepo.findAll(spec, pageable);
	}

	@Override
	public Page<BookVo> findAllAndMapToVo(Specification<Book> spec, Pageable pageable) {
		return this.findAll(spec, pageable).map(bookMapper::toVo);
	}

	private Optional<Book> findById(Long id) {
		return bookRepo.findById(id);
	}

	@Override
	public BookVo findByIdAndMapToVo(Long id) {
		return this.findById(id).map(book -> bookMapper.toVo(book)).orElseThrow();
	}

	@Override
	public BookVo createNew(BookVo bookVo) {
		Assert.isNull(bookVo.getId(), "Cannot set id for new Book");
		return bookMapper.toVo(this.create(bookMapper.toNewEntity(bookVo)));
	}

	private Book create(Book book) {
		Assert.isNull(book.getId(), "Cannot set id for new Book");

		book = bookRepo.saveAndFlush(book);
		log.info("New Book({}) created for title: {}", book.getId(), book.getTitle());

		return book;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public BookVo findAndUpdate(BookVo bookVo) {
		Assert.notNull(bookVo.getId(), "Book id is mandatory to find and update details");

		// @formatter:off
		return bookMapper.toVo(
				this.update(
						bookRepo.findById(bookVo.getId())
							.map(book -> bookMapper.toExistingEntity(bookVo, book))
							.orElseThrow()));
		// @formatter:on
	}

	private Book update(Book book) {
		Assert.notNull(book.getId(), "Book id is mandatory to find and update details");

		book = bookRepo.saveAndFlush(book);
		entityManager.refresh(book);
		log.info("Updated Book({})", book.getId());

		return book;
	}

	@Override
	public void deleteById(Long id) {
		if (bookRepo.existsById(id)) {
			bookRepo.deleteById(id);
		} else {
			throw new NoSuchElementException("No Book exists with id " + id);
		}
		log.info("Deleted Book({})", id);
	}

}
