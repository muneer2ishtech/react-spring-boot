package fi.ishtech.practice.books.payload;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

/**
 *
 * @author Muneer Ahmed Syed
 */
@Data
public class BookVo implements Serializable {

	private static final long serialVersionUID = -1060285471489282789L;

	@Positive
	private Long id;

	@NotBlank
	private String title;

	@NotBlank
	private String author;

	@NotNull
	@Positive
	private Integer year;

	@NotNull
	@Positive
	private BigDecimal price;

}
