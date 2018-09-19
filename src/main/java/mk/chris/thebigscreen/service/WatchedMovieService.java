package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.WatchedMovieDTO;
import mk.chris.thebigscreen.service.responses.MovieResponse;

/**
 * Service Interface for managing WatchedMovie.
 */
public interface WatchedMovieService {

    /**
     * Save a watchedMovie.
     *
     * @param watchedMovieDTO the entity to save
     * @return the persisted entity
     */
    MovieResponse save(WatchedMovieDTO watchedMovieDTO);

    /**
     * Get all the watchedMovies.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    //    TODO: implement later, no usage for this method currently
//    Page<MovieResponse> findAll(Pageable pageable);

    /**
     * Get the "id" watchedMovie.
     *
     * @param user_id the id of the user who rated the movie
     * @param movie_id the id of the movie
     * @return the entity
     */
    MovieResponse findOne(Long user_id, Long movie_id);

    /**
     * Delete the "id" watchedMovie.
     *
     * @param user_id the id of the user who rated the movie
     * @param movie_id the id of the movie
     */
    void delete(Long user_id, Long movie_id);
}
