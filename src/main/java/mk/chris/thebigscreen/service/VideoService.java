package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.VideoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Video.
 */
public interface VideoService {

    /**
     * Save a video.
     *
     * @param videoDTO the entity to save
     * @return the persisted entity
     */
    VideoDTO save(VideoDTO videoDTO);

    /**
     * Get all the videos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VideoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" video.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VideoDTO findOne(Long id);

    /**
     * Delete the "id" video.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
