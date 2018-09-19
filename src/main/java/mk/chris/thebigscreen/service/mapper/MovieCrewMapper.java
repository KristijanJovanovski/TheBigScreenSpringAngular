package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.MovieCrewDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MovieCrew and its DTO MovieCrewDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class, PeopleMapper.class})
public interface MovieCrewMapper extends EntityMapper<MovieCrewDTO, MovieCrew> {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "people.id", target = "peopleId")
    MovieCrewDTO toDto(MovieCrew movieCrew);

    @Mapping(source = "movieId", target = "movie")
    @Mapping(source = "peopleId", target = "people")
    MovieCrew toEntity(MovieCrewDTO movieCrewDTO);

    default MovieCrew fromId(Long id) {
        if (id == null) {
            return null;
        }
        MovieCrew movieCrew = new MovieCrew();
        movieCrew.setId(id);
        return movieCrew;
    }
}
