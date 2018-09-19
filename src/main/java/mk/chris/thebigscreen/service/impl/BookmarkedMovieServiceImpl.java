package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.domain.BookmarkedMovie;
import mk.chris.thebigscreen.domain.Movie;
import mk.chris.thebigscreen.domain.RatedMovie;
import mk.chris.thebigscreen.domain.WatchedMovie;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.service.BookmarkedMovieService;
import mk.chris.thebigscreen.service.dto.BookmarkedMovieDTO;
import mk.chris.thebigscreen.service.mapper.BookmarkedMovieMapper;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BookmarkedMovie.
 */
@Service
@Transactional
public class BookmarkedMovieServiceImpl implements BookmarkedMovieService {

    private final Logger log = LoggerFactory.getLogger(BookmarkedMovieServiceImpl.class);

    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    private final BookmarkedMovieMapper bookmarkedMovieMapper;

    private final RatedMovieRepository ratedMovieRepository;

    private final WatchedMovieRepository watchedMovieRepository;

    public BookmarkedMovieServiceImpl(
        BookmarkedMovieMapper bookmarkedMovieMapper,
        BookmarkedMovieRepository bookmarkedMovieRepository,
        RatedMovieRepository ratedMovieRepository,
        WatchedMovieRepository watchedMovieRepository
    ) {
        this.bookmarkedMovieMapper = bookmarkedMovieMapper;
        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
        this.ratedMovieRepository = ratedMovieRepository;
        this.watchedMovieRepository = watchedMovieRepository;
    }

    /**
     * Save a bookmarkedMovie.
     *
     * @param bookmarkedMovieDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovieResponse save(BookmarkedMovieDTO bookmarkedMovieDTO) {
        log.debug("Request to save BookmarkedMovie : {}", bookmarkedMovieDTO);

        BookmarkedMovie bookmarkedMovie = bookmarkedMovieMapper.toEntity(bookmarkedMovieDTO);

        UserMoviePK id = new UserMoviePK(bookmarkedMovie.getUserId(), bookmarkedMovie.getMovieId());

        bookmarkedMovie = bookmarkedMovieRepository.save(bookmarkedMovie);
        RatedMovie ratedMovie = null;
        WatchedMovie watchedMovie = null;
        try{
            ratedMovie = ratedMovieRepository.findOne(id);
            watchedMovie = watchedMovieRepository.findOne(id);
        }
        catch (IllegalArgumentException e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }
        if(bookmarkedMovie != null) {
            return getMovieResponse(bookmarkedMovie, ratedMovie, watchedMovie);
        }else
            return null;
    }

    /**
     * Get one bookmarkedMovie by user_id and movie_id.
     *
     * @param user_id the id of the user who bookmarked the movie
     * @param movie_id the id of the movie
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MovieResponse findOne(Long user_id, Long movie_id) {
        log.debug("Request to get BookmarkedMovie : {} {}", user_id, movie_id);
        UserMoviePK id = new UserMoviePK(user_id, movie_id);
        BookmarkedMovie bookmarkedMovie = null;
        RatedMovie ratedMovie = null;
        WatchedMovie watchedMovie = null;
        try{
            bookmarkedMovie = bookmarkedMovieRepository.findOne(id);
            ratedMovie = ratedMovieRepository.findOne(id);
            watchedMovie = watchedMovieRepository.findOne(id);
        }
        catch (Exception e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }

        if(bookmarkedMovie != null) {
            return getMovieResponse(bookmarkedMovie, ratedMovie, watchedMovie);
        }
        return null;
    }

    private MovieResponse getMovieResponse(BookmarkedMovie bookmarkedMovie, RatedMovie ratedMovie, WatchedMovie watchedMovie) {
        Movie movie = bookmarkedMovie.getMovie();
        MovieResponse movieResponse = new MovieResponse(movie);
        movieResponse.setGenres(movie.getGenres());
        movieResponse.setBookmarkedOn(bookmarkedMovie.getCreatedOn());

        if (watchedMovie != null) {
            movieResponse.setWatchedOn(watchedMovie.getCreatedOn());
        }
        if (ratedMovie != null) {
            movieResponse.setRatedOn(ratedMovie.getCreatedOn());
            movieResponse.setRate(ratedMovie.getRate());
        }
        return movieResponse;
    }

    /**
     * Delete the bookmarkedMovie by user_id and movie_id.
     *
     * @param user_id the id of the user who bookmarked the movie
     * @param movie_id the id of the movie
     */
    @Override
    public void delete(Long user_id, Long movie_id) {
        log.debug("Request to delete BookmarkedMovie : {}", user_id, movie_id);
        bookmarkedMovieRepository.delete(new UserMoviePK(user_id,movie_id));
    }
}
