package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.domain.WatchedMovie;
import mk.chris.thebigscreen.domain.Movie;
import mk.chris.thebigscreen.domain.RatedMovie;
import mk.chris.thebigscreen.domain.BookmarkedMovie;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.service.WatchedMovieService;
import mk.chris.thebigscreen.service.dto.WatchedMovieDTO;
import mk.chris.thebigscreen.service.mapper.WatchedMovieMapper;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing WatchedMovie.
 */
@Service
@Transactional
public class WatchedMovieServiceImpl implements WatchedMovieService {

    private final Logger log = LoggerFactory.getLogger(WatchedMovieServiceImpl.class);

    private final WatchedMovieRepository watchedMovieRepository;

    private final WatchedMovieMapper watchedMovieMapper;

    private final RatedMovieRepository ratedMovieRepository;

    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    public WatchedMovieServiceImpl(
        WatchedMovieMapper watchedMovieMapper,
        WatchedMovieRepository watchedMovieRepository,
        RatedMovieRepository ratedMovieRepository,
        BookmarkedMovieRepository bookmarkedMovieRepository
    ) {
        this.watchedMovieMapper = watchedMovieMapper;
        this.watchedMovieRepository = watchedMovieRepository;
        this.ratedMovieRepository = ratedMovieRepository;
        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
    }

    /**
     * Save a watchedMovie.
     *
     * @param watchedMovieDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovieResponse save(WatchedMovieDTO watchedMovieDTO) {
        log.debug("Request to save WatchedMovie : {}", watchedMovieDTO);

        WatchedMovie watchedMovie = watchedMovieMapper.toEntity(watchedMovieDTO);

        UserMoviePK id = new UserMoviePK(watchedMovie.getUserId(), watchedMovie.getMovieId());

        watchedMovie = watchedMovieRepository.save(watchedMovie);
        RatedMovie ratedMovie = null;
        BookmarkedMovie bookmarkedMovie = null;
        try{
            ratedMovie = ratedMovieRepository.findOne(id);
            bookmarkedMovie = bookmarkedMovieRepository.findOne(id);
        }
        catch (IllegalArgumentException e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }
        if(watchedMovie != null) {
            return getMovieResponse(watchedMovie, ratedMovie, bookmarkedMovie);
        }else
            return null;
    }

    /**
     * Get one watchedMovie by user_id and movie_id.
     *
     * @param user_id the id of the user who watched the movie
     * @param movie_id the id of the movie
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MovieResponse findOne(Long user_id, Long movie_id) {
        log.debug("Request to get WatchedMovie : {} {}", user_id, movie_id);
        UserMoviePK id = new UserMoviePK(user_id, movie_id);
        WatchedMovie watchedMovie = null;
        RatedMovie ratedMovie = null;
        BookmarkedMovie bookmarkedMovie = null;
        try{
            watchedMovie = watchedMovieRepository.findOne(id);
            ratedMovie = ratedMovieRepository.findOne(id);
            bookmarkedMovie = bookmarkedMovieRepository.findOne(id);
        }
        catch (Exception e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }

        if(watchedMovie != null) {
            return getMovieResponse(watchedMovie, ratedMovie, bookmarkedMovie);
        }
        return null;
    }

    private MovieResponse getMovieResponse(WatchedMovie watchedMovie, RatedMovie ratedMovie, BookmarkedMovie bookmarkedMovie) {
        Movie movie = watchedMovie.getMovie();
        MovieResponse movieResponse = new MovieResponse(movie);
        movieResponse.setGenres(movie.getGenres());
        movieResponse.setWatchedOn(watchedMovie.getCreatedOn());

        if (bookmarkedMovie != null) {
            movieResponse.setBookmarkedOn(bookmarkedMovie.getCreatedOn());
        }
        if (ratedMovie != null) {
            movieResponse.setRatedOn(ratedMovie.getCreatedOn());
            movieResponse.setRate(ratedMovie.getRate());
        }
        return movieResponse;
    }

    /**
     * Delete the watchedMovie by user_id and movie_id.
     *
     * @param user_id the id of the user who watched the movie
     * @param movie_id the id of the movie
     */
    @Override
    public void delete(Long user_id, Long movie_id) {
        log.debug("Request to delete WatchedMovie : {}", user_id, movie_id);
        watchedMovieRepository.delete(new UserMoviePK(user_id,movie_id));
    }
}
