package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.BookmarkedMovieDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BookmarkedMovie and its DTO BookmarkedMovieDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class, UserMapper.class})
public interface BookmarkedMovieMapper extends EntityMapper<BookmarkedMovieDTO, BookmarkedMovie> {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "user.id", target = "userId")
    BookmarkedMovieDTO toDto(BookmarkedMovie bookmarkedMovie);

    @Mapping(source = "movieId", target = "movie")
    @Mapping(source = "userId", target = "user")
    BookmarkedMovie toEntity(BookmarkedMovieDTO bookmarkedMovieDTO);

    default BookmarkedMovie fromId(Long id) {
        if (id == null) {
            return null;
        }
        BookmarkedMovie bookmarkedMovie = new BookmarkedMovie();
//        TODO: fix this mapping
//        bookmarkedMovie.setId(id);
        return bookmarkedMovie;
    }
}
