package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.service.MovieService;
import mk.chris.thebigscreen.repository.MovieRepository;
import mk.chris.thebigscreen.service.UserService;
import mk.chris.thebigscreen.service.dto.MovieDTO;
import mk.chris.thebigscreen.service.enums.AppendToResponse;
import mk.chris.thebigscreen.service.mapper.MovieMapper;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Movie.
 */
@Service
@Transactional
public class MovieServiceImpl implements MovieService {

    private final Logger log = LoggerFactory.getLogger(MovieServiceImpl.class);

    private final MovieRepository movieRepository;

    private final MovieMapper movieMapper;

    private final UserService userService;

    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    private final RatedMovieRepository ratedMovieRepository;

    private final WatchedMovieRepository watchedMovieRepository;

    public MovieServiceImpl(
        MovieMapper movieMapper,
        MovieRepository movieRepository,
        UserService userService,
        BookmarkedMovieRepository bookmarkedMovieRepository,
        RatedMovieRepository ratedMovieRepository,
        WatchedMovieRepository watchedMovieRepository
    ) {
        this.movieMapper = movieMapper;
        this.movieRepository = movieRepository;
        this.userService = userService;
        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
        this.ratedMovieRepository = ratedMovieRepository;
        this.watchedMovieRepository = watchedMovieRepository;
    }

    /**
     * Save a movie.
     *
     * @param movieDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovieDTO save(MovieDTO movieDTO) {
        log.debug("Request to save Movie : {}", movieDTO);
        Movie movie = movieMapper.toEntity(movieDTO);
        movie = movieRepository.save(movie);
        return movieMapper.toDto(movie);
    }

    /**
     * Get one movie by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public MovieDTO findOne(Long id) {
        log.debug("Request to get Movie : {}", id);
        Movie movie = movieRepository.findOne(id);
        return movieMapper.toDto(movie);
    }

    /**
     * Get one movie by id.
     *
     * @param id the id of the entity
     * @param append_to_response is a list of query parameters for eager fetch of 1 to many and many to many relationships with movie
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MovieResponse findOne(Long id, List<String> append_to_response) {
        log.debug("Request to get Movie : {}", id);
        MovieResponse movieResponse;
        if(append_to_response != null){
            Set<String> append = append_to_response.stream()
                .filter(Objects::nonNull)
                .map(String::toUpperCase)
                .collect(Collectors.toSet());
            Movie movie = movieRepository.findOneWithEagerRelationships(id);

            if(movie == null) return null;

            movieResponse = new MovieResponse(movie);

            movieResponse.setGenres(movie.getGenres());

            if(append.contains(AppendToResponse.IMAGES)){
                movieResponse.setTmdbImages(movie.getTmdbImages());
            }
            if(append.contains(AppendToResponse.VIDEOS)){
                movieResponse.setVideos(movie.getVideos());
            }
            if(append.contains(AppendToResponse.CAST)){
                movieResponse.setCast(movie.getCast());
            }
            if(append.contains(AppendToResponse.CREW)){
                movieResponse.setCrew(movie.getCrew());
            }
        }else{
            Movie movie = movieRepository.findOne(id);
            if(movie == null) return null;
            movieResponse = new MovieResponse(movie);
        }





        Optional<User> user = userService.getUserWithAuthorities();

        if(user.isPresent()){
            User u = user.get();
            movieResponse = modifyMovieResponseForUser(id, movieResponse, u);
        }


        return movieResponse;
    }
    // TODO: implement to get watchable link :) maybe
    private MovieResponse modifyMovieResponseForUser(Long id, MovieResponse movieResponse, User user) {
        Long user_id = user.getId();

        UserMoviePK userMoviePK = new UserMoviePK(user_id, id);
        BookmarkedMovie bookmarkedMovie = null;
        RatedMovie ratedMovie = null;
        WatchedMovie watchedMovie = null;
        try{
            bookmarkedMovie = bookmarkedMovieRepository.findOne(userMoviePK);
            ratedMovie = ratedMovieRepository.findOne(userMoviePK);
            watchedMovie = watchedMovieRepository.findOne(userMoviePK);
        }
        catch (Exception e){
            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
            e.printStackTrace();
        }
        if(bookmarkedMovie != null) {
            movieResponse.setBookmarkedOn(bookmarkedMovie.getCreatedOn());
        }
        if(ratedMovie != null) {
            movieResponse.setRatedOn(ratedMovie.getCreatedOn());
            movieResponse.setRate(ratedMovie.getRate());
        }
        if(watchedMovie != null) {
            movieResponse.setWatchedOn(watchedMovie.getCreatedOn());
        }
        return movieResponse;
    }

    /**
     * Delete the movie by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Movie : {}", id);
        movieRepository.delete(id);
    }
}
