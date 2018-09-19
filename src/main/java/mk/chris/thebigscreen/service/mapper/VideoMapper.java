package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.VideoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Video and its DTO VideoDTO.
 */
@Mapper(componentModel = "spring", uses = {MovieMapper.class})
public interface VideoMapper extends EntityMapper<VideoDTO, Video> {

    @Mapping(source = "movie.id", target = "movieId")
    VideoDTO toDto(Video video);

    @Mapping(source = "movieId", target = "movie")
    Video toEntity(VideoDTO videoDTO);

    default Video fromId(Long id) {
        if (id == null) {
            return null;
        }
        Video video = new Video();
        video.setId(id);
        return video;
    }
}
