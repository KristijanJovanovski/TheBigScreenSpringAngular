package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.RatedMovieDTO;
import mk.chris.thebigscreen.service.responses.MovieResponse;

/**
 * Service Interface for managing RatedMovie.
 */
public interface RatedMovieService {

    /**
     * Save a ratedMovie.
     *
     * @param ratedMovieDTO the entity to save
     * @return the persisted entity
     */
    MovieResponse save(RatedMovieDTO ratedMovieDTO);

    /**
     * Get all the ratedMovies.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
//    Page<MovieResponse> findAll(Pageable pageable);

    /**
     * Get the "id" ratedMovie.
     *
     * @param user_id the id of the user who rated the movie
     * @param movie_id the id of the movie
     * @return the entity
     */
    MovieResponse findOne(Long user_id, Long movie_id);

    /**
     * Delete the "id" ratedMovie.
     *
     * @param user_id the id of the user who rated the movie
     * @param movie_id the id of the movie
     */
    void delete(Long user_id, Long movie_id);
}
