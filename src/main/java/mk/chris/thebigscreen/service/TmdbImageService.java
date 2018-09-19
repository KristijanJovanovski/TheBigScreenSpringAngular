package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.TmdbImageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing TmdbImage.
 */
public interface TmdbImageService {

    /**
     * Save a tmdbImage.
     *
     * @param tmdbImageDTO the entity to save
     * @return the persisted entity
     */
    TmdbImageDTO save(TmdbImageDTO tmdbImageDTO);

    /**
     * Get all the tmdbImages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TmdbImageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" tmdbImage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TmdbImageDTO findOne(Long id);

    /**
     * Delete the "id" tmdbImage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
