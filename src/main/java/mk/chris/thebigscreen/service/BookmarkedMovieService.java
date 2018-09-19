package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.dto.BookmarkedMovieDTO;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing BookmarkedMovie.
 */
public interface BookmarkedMovieService {

    /**
     * Save a bookmarkedMovie.
     *
     * @param bookmarkedMovieDTO the entity to save
     * @return the persisted entity
     */
    MovieResponse save(BookmarkedMovieDTO bookmarkedMovieDTO);

    /**
     * Get all the bookmarkedMovies.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
//    TODO: implement later, no usage for this method currently
//    Page<MovieResponse> findAll(Long user_id, Pageable pageable);

    /**
     * Get the "id" bookmarkedMovie.
     *
     * @param user_id the id of the user who bookmarked the movie
     * @param movie_id the id of the movie
     * @return the entity
     */
    MovieResponse findOne(Long user_id, Long movie_id);

    /**
     * Delete the "id" bookmarkedMovie.
     *
     * @param user_id the id of the user who bookmarked the movie
     * @param movie_id the id of the movie
     */
    void delete(Long user_id, Long movie_id);
}
