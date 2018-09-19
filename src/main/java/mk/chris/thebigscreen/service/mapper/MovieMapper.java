package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.MovieDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Movie and its DTO MovieDTO.
 */
@Mapper(componentModel = "spring", uses = {GenreMapper.class})
public interface MovieMapper extends EntityMapper<MovieDTO, Movie> {


    @Mapping(target = "bookmarkedMovies", ignore = true)
    @Mapping(target = "watchedMovies", ignore = true)
    @Mapping(target = "ratedMovies", ignore = true)
    @Mapping(target = "videos", ignore = true)
    @Mapping(target = "cast", ignore = true)
    @Mapping(target = "crew", ignore = true)
    @Mapping(target = "tmdbImages", ignore = true)
    Movie toEntity(MovieDTO movieDTO);

    default Movie fromId(Long id) {
        if (id == null) {
            return null;
        }
        Movie movie = new Movie();
        movie.setId(id);
        return movie;
    }
}
