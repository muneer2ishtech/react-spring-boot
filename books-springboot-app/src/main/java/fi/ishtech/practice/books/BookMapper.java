package fi.ishtech.practice.books;

import org.mapstruct.InheritConfiguration;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fi.ishtech.practice.books.entity.Book;
import fi.ishtech.practice.books.payload.BookVo;

/**
 *
 * @author Muneer Ahmed Syed
 */
@Mapper(componentModel = "spring")
public interface BookMapper {

	@Mapping(target = "id", ignore = true)
	Book toNewEntity(BookVo vo);

	@InheritConfiguration(name = "toNewEntity")
	@Mapping(source = "id", target = "id")
	Book toExistingEntity(BookVo vo, @MappingTarget Book entity);

	@InheritInverseConfiguration(name = "toExistingEntity")
	BookVo toVo(Book entity);

}
