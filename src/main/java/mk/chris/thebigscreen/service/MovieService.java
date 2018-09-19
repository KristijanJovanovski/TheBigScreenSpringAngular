package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.MovieDTO;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service Interface for managing Movie.
 */
public interface MovieService {

    /**
     * Save a movie.
     *
     * @param movieDTO the entity to save
     * @return the persisted entity
     */
    MovieDTO save(MovieDTO movieDTO);

    /**
     * Get all the movies.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
//    TODO: implement later, no usage for this method currently
//    Page<MovieDTO> findAll(Pageable pageable);

    /**
     * Get the "id" movie.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MovieDTO findOne(Long id);

    /**
     * Get the "id" movie.
     *
     * @param id the id of the entity
     * @param append_to_response is a list of query parameters for eager fetch of 1 to many and many to many relationships with movie
     * @return the entity
     */
    MovieResponse findOne(Long id, List<String> append_to_response);

    /**
     * Delete the "id" movie.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
