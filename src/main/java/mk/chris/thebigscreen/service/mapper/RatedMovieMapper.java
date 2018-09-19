package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.RatedMovieDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RatedMovie and its DTO RatedMovieDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class, UserMapper.class})
public interface RatedMovieMapper extends EntityMapper<RatedMovieDTO, RatedMovie> {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "user.id", target = "userId")
    RatedMovieDTO toDto(RatedMovie ratedMovie);

    @Mapping(source = "movieId", target = "movie")
    @Mapping(source = "userId", target = "user")
    RatedMovie toEntity(RatedMovieDTO ratedMovieDTO);

    default RatedMovie fromId(Long id) {
        if (id == null) {
            return null;
        }
        RatedMovie ratedMovie = new RatedMovie();
//        TODO: fix this mapping
//        ratedMovie.setId(id);
        return ratedMovie;
    }
}
