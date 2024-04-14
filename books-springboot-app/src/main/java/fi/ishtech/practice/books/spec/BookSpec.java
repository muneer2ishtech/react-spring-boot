package fi.ishtech.practice.books.spec;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import fi.ishtech.practice.books.entity.Book;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * {@link Specification} for {@link Book}
 *
 * @author Muneer Ahmed Syed
 */
@Data
@AllArgsConstructor(staticName = "of")
public class BookSpec implements Specification<Book> {

	private static final long serialVersionUID = 354937099143587538L;

	private static final String PERCENT = "%";

	private Long id;
	private String title;
	private String author;
	private Integer minYear;
	private Integer maxYear;
	private BigDecimal minPrice;
	private BigDecimal maxPrice;

	@Override
	public Predicate toPredicate(Root<Book> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		List<Predicate> predicates = toPredicateList(root, cb);

		return cb.and(predicates.stream().toArray(Predicate[]::new));
	}

	private List<Predicate> toPredicateList(Root<Book> root, CriteriaBuilder cb) {
		List<Predicate> predicates = new ArrayList<>();

		addPredicateEq(predicates, root, cb, this.getId(), "id");

		addPredicateLike(predicates, root, cb, this.getTitle(), "title");
		addPredicateLike(predicates, root, cb, this.getAuthor(), "author");

		addPredicateGE(predicates, root, cb, this.getMinYear(), "year");
		addPredicateLE(predicates, root, cb, this.getMaxYear(), "year");

		addPredicateGE(predicates, root, cb, this.getMinPrice(), "price");
		addPredicateLE(predicates, root, cb, this.getMaxPrice(), "price");

		return predicates;
	}

	private void addPredicateEq(List<Predicate> predicates, Root<Book> root, CriteriaBuilder cb, Number attribValue,
			String attribName) {
		if (attribValue != null) {
			predicates.add(cb.equal(root.get(attribName), attribValue));
		}
	}

	private void addPredicateLike(List<Predicate> predicates, Root<Book> root, CriteriaBuilder cb, String attribValue,
			String attribName) {
		if (StringUtils.hasLength(attribValue)) {
			predicates.add(cb.like(root.get(attribName), padForSqlLike(attribValue)));
		}
	}

	private void addPredicateGE(List<Predicate> predicates, Root<Book> root, CriteriaBuilder cb, Integer attribValue,
			String attribName) {
		if (attribValue != null) {
			predicates.add(cb.ge(root.get(attribName), attribValue));
		}
	}

	private void addPredicateLE(List<Predicate> predicates, Root<Book> root, CriteriaBuilder cb, Integer attribValue,
			String attribName) {
		if (attribValue != null) {
			predicates.add(cb.ge(root.get(attribName), attribValue));
		}
	}

	private void addPredicateGE(List<Predicate> predicates, Root<Book> root, CriteriaBuilder cb, BigDecimal attribValue,
			String attribName) {
		if (attribValue != null) {
			predicates.add(cb.ge(root.get(attribName), attribValue));
		}
	}

	private void addPredicateLE(List<Predicate> predicates, Root<Book> root, CriteriaBuilder cb, BigDecimal attribValue,
			String attribName) {
		if (attribValue != null) {
			predicates.add(cb.ge(root.get(attribName), attribValue));
		}
	}

	/**
	 * pad with % on either side of string
	 *
	 * @param input
	 * @return input padded with % on either side
	 */
	private String padForSqlLike(String input) {
		return PERCENT + input + PERCENT;
	}

}
