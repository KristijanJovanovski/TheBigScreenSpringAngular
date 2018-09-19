package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.MovieCastDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MovieCast and its DTO MovieCastDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class, PeopleMapper.class})
public interface MovieCastMapper extends EntityMapper<MovieCastDTO, MovieCast> {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "people.id", target = "peopleId")
    MovieCastDTO toDto(MovieCast movieCast);

    @Mapping(source = "movieId", target = "movie")
    @Mapping(source = "peopleId", target = "people")
    MovieCast toEntity(MovieCastDTO movieCastDTO);

    default MovieCast fromId(Long id) {
        if (id == null) {
            return null;
        }
        MovieCast movieCast = new MovieCast();
        movieCast.setId(id);
        return movieCast;
    }
}
