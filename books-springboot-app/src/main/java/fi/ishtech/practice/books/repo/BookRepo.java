package fi.ishtech.practice.books.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.ishtech.practice.books.entity.Book;

/**
 *
 * @author Muneer Ahmed Syed
 */
public interface BookRepo extends JpaRepository<Book, Long> {

}
