package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.domain.RatedMovie;
import mk.chris.thebigscreen.domain.Movie;
import mk.chris.thebigscreen.domain.BookmarkedMovie;
import mk.chris.thebigscreen.domain.WatchedMovie;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.service.RatedMovieService;
import mk.chris.thebigscreen.service.dto.RatedMovieDTO;
import mk.chris.thebigscreen.service.mapper.RatedMovieMapper;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing RatedMovie.
 */
@Service
@Transactional
public class RatedMovieServiceImpl implements RatedMovieService {

    private final Logger log = LoggerFactory.getLogger(RatedMovieServiceImpl.class);

    private final RatedMovieRepository ratedMovieRepository;

    private final RatedMovieMapper ratedMovieMapper;

    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    private final WatchedMovieRepository watchedMovieRepository;

    public RatedMovieServiceImpl(
        RatedMovieMapper ratedMovieMapper,
        RatedMovieRepository ratedMovieRepository,
        BookmarkedMovieRepository bookmarkedMovieRepository,
        WatchedMovieRepository watchedMovieRepository
    ) {
        this.ratedMovieRepository = ratedMovieRepository;
        this.ratedMovieMapper = ratedMovieMapper;
        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
        this.watchedMovieRepository = watchedMovieRepository;
    }

    /**
     * Save a ratedMovie.
     *
     * @param ratedMovieDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovieResponse save(RatedMovieDTO ratedMovieDTO) {
        log.debug("Request to save RatedMovie : {}", ratedMovieDTO);

        RatedMovie ratedMovie = ratedMovieMapper.toEntity(ratedMovieDTO);

        UserMoviePK id = new UserMoviePK(ratedMovie.getUserId(), ratedMovie.getMovieId());

        ratedMovie = ratedMovieRepository.save(ratedMovie);
        BookmarkedMovie bookmarkedMovie = null;
        WatchedMovie watchedMovie = null;
        try{
            bookmarkedMovie = bookmarkedMovieRepository.findOne(id);
            watchedMovie = watchedMovieRepository.findOne(id);
        }
        catch (IllegalArgumentException e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }
        if(ratedMovie != null) {
            return getMovieResponse(ratedMovie, bookmarkedMovie, watchedMovie);
        }else
            return null;
    }

    /**
     * Get one ratedMovie by user_id and movie_id.
     *
     * @param user_id the id of the user who rated the movie
     * @param movie_id the id of the movie
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MovieResponse findOne(Long user_id, Long movie_id) {
        log.debug("Request to get RatedMovie : {} {}", user_id, movie_id);
        UserMoviePK id = new UserMoviePK(user_id, movie_id);
        RatedMovie ratedMovie = null;
        BookmarkedMovie bookmarkedMovie = null;
        WatchedMovie watchedMovie = null;
        try{
            ratedMovie = ratedMovieRepository.findOne(id);
            bookmarkedMovie = bookmarkedMovieRepository.findOne(id);
            watchedMovie = watchedMovieRepository.findOne(id);
        }
        catch (Exception e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }

        if(ratedMovie != null) {
            return getMovieResponse(ratedMovie, bookmarkedMovie, watchedMovie);
        }
        return null;
    }

    private MovieResponse getMovieResponse(RatedMovie ratedMovie, BookmarkedMovie bookmarkedMovie, WatchedMovie watchedMovie) {
        Movie movie = ratedMovie.getMovie();
        MovieResponse movieResponse = new MovieResponse(movie);
        movieResponse.setGenres(movie.getGenres());
        movieResponse.setRate(ratedMovie.getRate());
        movieResponse.setRatedOn(ratedMovie.getCreatedOn());

        if (bookmarkedMovie != null) {
            movieResponse.setBookmarkedOn(bookmarkedMovie.getCreatedOn());
        }
        if (watchedMovie != null) {
            movieResponse.setWatchedOn(watchedMovie.getCreatedOn());
        }
        return movieResponse;
    }

    /**
     * Delete the ratedMovie by user_id and movie_id.
     *
     * @param user_id the id of the user who rated the movie
     * @param movie_id the id of the movie
     */
    @Override
    public void delete(Long user_id, Long movie_id) {
        log.debug("Request to delete RatedMovie : {}", user_id, movie_id);
        ratedMovieRepository.delete(new UserMoviePK(user_id,movie_id));
    }
}
