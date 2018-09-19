package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.WatchedMovieDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity WatchedMovie and its DTO WatchedMovieDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class, UserMapper.class})
public interface WatchedMovieMapper extends EntityMapper<WatchedMovieDTO, WatchedMovie> {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "user.id", target = "userId")
    WatchedMovieDTO toDto(WatchedMovie watchedMovie);

    @Mapping(source = "movieId", target = "movie")
    @Mapping(source = "userId", target = "user")
    WatchedMovie toEntity(WatchedMovieDTO watchedMovieDTO);

    default WatchedMovie fromId(Long id) {
        if (id == null) {
            return null;
        }
        WatchedMovie watchedMovie = new WatchedMovie();
//        TODO: fix this mapping
//        watchedMovie.setId(id);
        return watchedMovie;
    }
}
