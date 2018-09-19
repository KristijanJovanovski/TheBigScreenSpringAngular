package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.MovieCastDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing MovieCast.
 */
public interface MovieCastService {

    /**
     * Save a movieCast.
     *
     * @param movieCastDTO the entity to save
     * @return the persisted entity
     */
    MovieCastDTO save(MovieCastDTO movieCastDTO);

    /**
     * Get all the movieCasts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MovieCastDTO> findAll(Pageable pageable);

    /**
     * Get the "id" movieCast.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MovieCastDTO findOne(Long id);

    /**
     * Delete the "id" movieCast.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
