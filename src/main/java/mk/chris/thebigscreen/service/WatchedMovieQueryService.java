package mk.chris.thebigscreen.service;


import io.github.jhipster.service.QueryService;
import io.github.jhipster.service.filter.LongFilter;
import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.service.dto.WatchedMovieCriteria;
import mk.chris.thebigscreen.service.dto.WatchedMovieDTO;
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
 * Service for executing complex queries for WatchedMovie entities in the database.
 * The main input is a {@link WatchedMovieCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link WatchedMovieDTO} or a {@link Page} of {@link WatchedMovieDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class WatchedMovieQueryService extends QueryService<WatchedMovie> {

    private final Logger log = LoggerFactory.getLogger(WatchedMovieQueryService.class);

    private final WatchedMovieRepository watchedMovieRepository;

    private final RatedMovieRepository ratedMovieRepository;

    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    public WatchedMovieQueryService(
        WatchedMovieRepository watchedMovieRepository,
        RatedMovieRepository ratedMovieRepository,
        BookmarkedMovieRepository bookmarkedMovieRepository
    ) {

        this.watchedMovieRepository = watchedMovieRepository;
        this.ratedMovieRepository = ratedMovieRepository;
        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
    }

    /**
     * Return a {@link Page} of {@link WatchedMovieDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MovieResponse> findByCriteria(Long user_id, WatchedMovieCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<WatchedMovie> specification = createSpecification(criteria, user_id);
        final Page<WatchedMovie> result = watchedMovieRepository.findAll(specification, page);

        if(result.getNumberOfElements()>0){
            List<UserMoviePK> ids = new ArrayList<>();
            result.forEach(watchedMovie -> ids.add(new UserMoviePK(user_id, watchedMovie.getMovieId())));

            List<RatedMovie> ratedMovies = ratedMovieRepository.findAll(ids);
            List<BookmarkedMovie> bookmarkedMovies = bookmarkedMovieRepository.findAll(ids);
            Map<Long, RatedMovie> ratedMovieMap = null;
            Map<Long, BookmarkedMovie> bookmarkedMovieMap = null;

            if(ratedMovies!=null){
                ratedMovieMap = ratedMovies
                    .parallelStream().filter(Objects::nonNull).collect(Collectors.toList())
                    .stream().collect(Collectors.toMap(RatedMovie::getMovieId,ratedMovie -> ratedMovie));
            }
            if(bookmarkedMovies!=null){
                bookmarkedMovieMap = bookmarkedMovies
                    .parallelStream().filter(Objects::nonNull).collect(Collectors.toList())
                    .stream().collect(Collectors.toMap(BookmarkedMovie::getMovieId,bookmarkedMovie -> bookmarkedMovie));
            }

            return getMovieResponse(ratedMovieMap, bookmarkedMovieMap, result);
        }
        return getMovieResponse(null,null, result);
    }

    private Page<MovieResponse> getMovieResponse(Map<Long, RatedMovie> ratedMovies, Map<Long, BookmarkedMovie> bookmarkedMovies, Page<WatchedMovie> watchedMovies) {

        return watchedMovies.map(watchedMovie -> {
            Movie movie = watchedMovie.getMovie();
            MovieResponse movieResponse = new MovieResponse(movie);
            movieResponse.setWatchedOn(watchedMovie.getCreatedOn());
            movieResponse.setGenres(movie.getGenres());

            if (ratedMovies != null && ratedMovies.containsKey(watchedMovie.getMovieId())) {
                movieResponse.setRatedOn(ratedMovies.get(watchedMovie.getMovieId()).getCreatedOn());
                movieResponse.setRate(ratedMovies.get(watchedMovie.getMovieId()).getRate());
            }
            if (bookmarkedMovies != null && bookmarkedMovies.containsKey(watchedMovie.getMovieId())) {
                movieResponse.setBookmarkedOn(bookmarkedMovies.get(watchedMovie.getMovieId()).getCreatedOn());
            }
            return movieResponse;
        });
    }

    /**
     * Function to convert WatchedMovieCriteria to a {@link Specifications}
     */
    private Specifications<WatchedMovie> createSpecification(WatchedMovieCriteria criteria, Long user_id) {
        Specifications<WatchedMovie> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getCreatedOn() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCreatedOn(), WatchedMovie_.createdOn));
            }
            if (criteria.getMovieId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMovieId(), WatchedMovie_.movie, Movie_.id));
            }
            if (user_id != null) {
                specification=  specification.and(buildReferringEntitySpecification((new LongFilter()).setEquals(user_id), WatchedMovie_.user, User_.id));
            }
        }
        return specification;
    }

}
