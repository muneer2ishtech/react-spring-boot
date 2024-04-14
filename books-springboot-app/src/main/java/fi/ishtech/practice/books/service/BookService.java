package fi.ishtech.practice.books.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import fi.ishtech.practice.books.entity.Book;
import fi.ishtech.practice.books.payload.BookVo;

/**
 *
 * @author Muneer Ahmed Syed
 */
public interface BookService {

	Page<BookVo> findAllAndMapToVo(Specification<Book> spec, Pageable pageable);

	BookVo findByIdAndMapToVo(Long id);

	Book create(Book book);

	Book update(Book book);

	void deleteById(Long id);

}
