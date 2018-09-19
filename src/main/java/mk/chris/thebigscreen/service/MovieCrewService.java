package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.MovieCrewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing MovieCrew.
 */
public interface MovieCrewService {

    /**
     * Save a movieCrew.
     *
     * @param movieCrewDTO the entity to save
     * @return the persisted entity
     */
    MovieCrewDTO save(MovieCrewDTO movieCrewDTO);

    /**
     * Get all the movieCrews.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MovieCrewDTO> findAll(Pageable pageable);

    /**
     * Get the "id" movieCrew.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MovieCrewDTO findOne(Long id);

    /**
     * Delete the "id" movieCrew.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
