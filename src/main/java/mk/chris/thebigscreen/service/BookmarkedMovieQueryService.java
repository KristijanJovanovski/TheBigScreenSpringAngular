package mk.chris.thebigscreen.service;


import io.github.jhipster.service.QueryService;
import io.github.jhipster.service.filter.LongFilter;
import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.service.dto.BookmarkedMovieCriteria;
import mk.chris.thebigscreen.service.dto.BookmarkedMovieDTO;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Service for executing complex queries for BookmarkedMovie entities in the database.
 * The main input is a {@link BookmarkedMovieCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link BookmarkedMovieDTO} or a {@link Page} of {@link BookmarkedMovieDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class BookmarkedMovieQueryService extends QueryService<BookmarkedMovie> {

    private final Logger log = LoggerFactory.getLogger(BookmarkedMovieQueryService.class);


    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    private final RatedMovieRepository ratedMovieRepository;

    private final WatchedMovieRepository watchedMovieRepository;

    public BookmarkedMovieQueryService(
        BookmarkedMovieRepository bookmarkedMovieRepository,
        RatedMovieRepository ratedMovieRepository,
        WatchedMovieRepository watchedMovieRepository
    ) {

        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
        this.ratedMovieRepository = ratedMovieRepository;
        this.watchedMovieRepository = watchedMovieRepository;
    }

    /**
     * Return a {@link Page} of {@link BookmarkedMovieDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MovieResponse> findByCriteria(Long user_id, BookmarkedMovieCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<BookmarkedMovie> specification = createSpecification(criteria, user_id);
        final Page<BookmarkedMovie> result = bookmarkedMovieRepository.findAll(specification, page);

        if(result.getNumberOfElements()>0){
            List<UserMoviePK> ids = new ArrayList<>();
            result.forEach(bookmarkedMovie -> ids.add(new UserMoviePK(user_id, bookmarkedMovie.getMovieId())));

            List<RatedMovie> ratedMovies = ratedMovieRepository.findAll(ids);
            List<WatchedMovie> watchedMovies = watchedMovieRepository.findAll(ids);
            Map<Long, RatedMovie> ratedMovieMap = null;
            Map<Long, WatchedMovie> watchedMovieMap = null;

            if(ratedMovies!=null){
                ratedMovieMap = ratedMovies
                    .parallelStream().filter(Objects::nonNull).collect(Collectors.toList())
                    .stream().collect(Collectors.toMap(RatedMovie::getMovieId,ratedMovie -> ratedMovie));
            }
            if(watchedMovies!=null){
                watchedMovieMap = watchedMovies
                    .parallelStream().filter(Objects::nonNull).collect(Collectors.toList())
                    .stream().collect(Collectors.toMap(WatchedMovie::getMovieId,watchedMovie -> watchedMovie));
            }

            return getMovieResponse(ratedMovieMap, watchedMovieMap, result);
        }
        return getMovieResponse(null,null, result);
    }

    private Page<MovieResponse> getMovieResponse(Map<Long, RatedMovie> ratedMovies, Map<Long, WatchedMovie> watchedMovies, Page<BookmarkedMovie> bookmarkedMovies) {

        return bookmarkedMovies.map(bookmarkedMovie -> {
            Movie movie = bookmarkedMovie.getMovie();
            MovieResponse movieResponse = new MovieResponse(movie);
            movieResponse.setBookmarkedOn(bookmarkedMovie.getCreatedOn());
            movieResponse.setGenres(movie.getGenres());

            if (ratedMovies != null && ratedMovies.containsKey(bookmarkedMovie.getMovieId())) {
                movieResponse.setRatedOn(ratedMovies.get(bookmarkedMovie.getMovieId()).getCreatedOn());
                movieResponse.setRate(ratedMovies.get(bookmarkedMovie.getMovieId()).getRate());
            }
            if (watchedMovies != null && watchedMovies.containsKey(bookmarkedMovie.getMovieId())) {
                movieResponse.setWatchedOn(watchedMovies.get(bookmarkedMovie.getMovieId()).getCreatedOn());
            }
            return movieResponse;
        });
    }

    /**
     * Function to convert BookmarkedMovieCriteria to a {@link Specifications}
     */
    private Specifications<BookmarkedMovie> createSpecification(BookmarkedMovieCriteria criteria, Long user_id) {
        Specifications<BookmarkedMovie> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getCreatedOn() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCreatedOn(), BookmarkedMovie_.createdOn));
            }
            if (criteria.getMovieId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMovieId(), BookmarkedMovie_.movie, Movie_.id));
            }
            if (user_id != null) {
                specification=  specification.and(buildReferringEntitySpecification((new LongFilter()).setEquals(user_id), BookmarkedMovie_.user, User_.id));
            }
        }
        return specification;
    }

}
