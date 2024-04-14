package fi.ishtech.practice.books.repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import fi.ishtech.practice.books.entity.Book;

/**
 *
 * @author Muneer Ahmed Syed
 */
public interface BookRepo extends JpaRepository<Book, Long> {

	Optional<Book> findByTitle(String title);

	Page<Book> findAll(Specification<Book> spec, Pageable pageable);

}
