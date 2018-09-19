package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.TmdbImageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TmdbImage and its DTO TmdbImageDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class, PeopleMapper.class})
public interface TmdbImageMapper extends EntityMapper<TmdbImageDTO, TmdbImage> {

    @Mapping(source = "movie.id", target = "movieId")
    @Mapping(source = "people.id", target = "peopleId")
    TmdbImageDTO toDto(TmdbImage tmdbImage);

    @Mapping(source = "movieId", target = "movie")
    @Mapping(source = "peopleId", target = "people")
    TmdbImage toEntity(TmdbImageDTO tmdbImageDTO);

    default TmdbImage fromId(Long id) {
        if (id == null) {
            return null;
        }
        TmdbImage tmdbImage = new TmdbImage();
        tmdbImage.setId(id);
        return tmdbImage;
    }
}
