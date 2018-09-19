package mk.chris.thebigscreen.service;


import io.github.jhipster.service.QueryService;
import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import mk.chris.thebigscreen.repository.BookmarkedMovieRepository;
import mk.chris.thebigscreen.repository.MovieRepository;
import mk.chris.thebigscreen.repository.RatedMovieRepository;
import mk.chris.thebigscreen.repository.WatchedMovieRepository;
import mk.chris.thebigscreen.service.dto.MovieCriteria;
import mk.chris.thebigscreen.service.mapper.MovieMapper;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service for executing complex queries for Movie entities in the database.
 * The main input is a {@link MovieCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MovieResponse} or a {@link Page} of {@link MovieResponse} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MovieQueryService extends QueryService<Movie> {

    private final Logger log = LoggerFactory.getLogger(MovieQueryService.class);

    private final MovieRepository movieRepository;

    private final UserService userService;

    private final BookmarkedMovieRepository bookmarkedMovieRepository;

    private final RatedMovieRepository ratedMovieRepository;

    private final WatchedMovieRepository watchedMovieRepository;

    public MovieQueryService(
        MovieRepository movieRepository,
        UserService userService,
        BookmarkedMovieRepository bookmarkedMovieRepository,
        RatedMovieRepository ratedMovieRepository,
        WatchedMovieRepository watchedMovieRepository
    ) {
        this.movieRepository = movieRepository;
        this.userService = userService;
        this.bookmarkedMovieRepository = bookmarkedMovieRepository;
        this.ratedMovieRepository = ratedMovieRepository;
        this.watchedMovieRepository = watchedMovieRepository;
    }

    /**
     * Return a {@link Page} of {@link MovieResponse} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MovieResponse> findByCriteria(MovieCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Movie> specification = createSpecification(criteria);
        final Page<Movie> result = movieRepository.findAll(specification, page);

        Optional<User> user = userService.getUserWithAuthorities();

        if(user.isPresent()) {
            return modifyMovieResponseForUser(result, user.get());
        }else{
            return getMovieResponse(null, null, null, result);
        }
    }
    private Page<MovieResponse> modifyMovieResponseForUser(Page<Movie> result, User user){
        if(result.getNumberOfElements() > 0){
            List<UserMoviePK> ids = new ArrayList<>();
            result.forEach(movie -> ids.add(new UserMoviePK(user.getId(), movie.getId())));

            List<BookmarkedMovie> bookmarkedMovies = bookmarkedMovieRepository.findAll(ids);
            List<RatedMovie> ratedMovies = ratedMovieRepository.findAll(ids);
            List<WatchedMovie> watchedMovies = watchedMovieRepository.findAll(ids);

            Map<Long, BookmarkedMovie> bookmarkedMovieMap = null;
            Map<Long, RatedMovie> ratedMovieMap = null;
            Map<Long, WatchedMovie> watchedMovieMap = null;

            if(bookmarkedMovies!=null){
                bookmarkedMovieMap = bookmarkedMovies
                    .parallelStream().filter(Objects::nonNull)
                    .collect(Collectors.toMap(BookmarkedMovie::getMovieId,bookmarkedMovie -> bookmarkedMovie));
            }
            if(ratedMovies!=null){
                ratedMovieMap = ratedMovies
                    .parallelStream().filter(Objects::nonNull)
                    .collect(Collectors.toMap(RatedMovie::getMovieId,ratedMovie -> ratedMovie));
            }
            if(watchedMovies!=null){
                watchedMovieMap = watchedMovies
                    .parallelStream().filter(Objects::nonNull)
                    .collect(Collectors.toMap(WatchedMovie::getMovieId,watchedMovie -> watchedMovie));
            }

            return getMovieResponse(bookmarkedMovieMap, watchedMovieMap, ratedMovieMap, result);
        }
        return getMovieResponse(null,null, null, result);
    }

    private Page<MovieResponse> getMovieResponse(Map<Long,BookmarkedMovie> bookmarkedMovieMap, Map<Long,WatchedMovie> watchedMovieMap, Map<Long,RatedMovie> ratedMovieMap, Page<Movie> movies) {
        return movies.map(movie -> {

            MovieResponse movieResponse = new MovieResponse(movie);
            movieResponse.setGenres(movie.getGenres());

            if (bookmarkedMovieMap != null && bookmarkedMovieMap.containsKey(movie.getId())) {
                movieResponse.setBookmarkedOn(bookmarkedMovieMap.get(movie.getId()).getCreatedOn());
            }
            if (ratedMovieMap != null && ratedMovieMap.containsKey(movie.getId())) {
                movieResponse.setRatedOn(ratedMovieMap.get(movie.getId()).getCreatedOn());
                movieResponse.setRate(ratedMovieMap.get(movie.getId()).getRate());
            }
            if (watchedMovieMap != null && watchedMovieMap.containsKey(movie.getId())) {
                movieResponse.setWatchedOn(watchedMovieMap.get(movie.getId()).getCreatedOn());
            }
            return movieResponse;
        });
    }

    /**
     * Function to convert MovieCriteria to a {@link Specifications}
     */
    private Specifications<Movie> createSpecification(MovieCriteria criteria) {
        Specifications<Movie> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Movie_.id));
            }
            if (criteria.getImdbId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getImdbId(), Movie_.imdbId));
            }
//            if (criteria.getBackdropPath() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getBackdropPath(), Movie_.backdropPath));
//            }
//            if (criteria.getPosterPath() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getPosterPath(), Movie_.posterPath));
//            }
            if (criteria.getOriginalTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getOriginalTitle(), Movie_.originalTitle));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), Movie_.title));
            }
            if (criteria.getOriginalLanguage() != null) {
                specification = specification.and(buildStringSpecification(criteria.getOriginalLanguage(), Movie_.originalLanguage));
            }
            if (criteria.getVoteAverage() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVoteAverage(), Movie_.voteAverage));
            }
            if (criteria.getPopularity() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPopularity(), Movie_.popularity));
            }
            if (criteria.getVoteCount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVoteCount(), Movie_.voteCount));
            }
            if (criteria.getBudget() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBudget(), Movie_.budget));
            }
            if (criteria.getRuntime() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRuntime(), Movie_.runtime));
            }
            if (criteria.getRevenue() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRevenue(), Movie_.revenue));
            }
            if (criteria.getReleaseDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getReleaseDate(), Movie_.releaseDate));
            }
//            if (criteria.getOverview() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getOverview(), Movie_.overview));
//            }
            if (criteria.getStatus() != null) {
                specification = specification.and(buildSpecification(criteria.getStatus(), Movie_.status));
            }
//            if (criteria.getBookmarkedMoviesId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getBookmarkedMoviesId(), Movie_.bookmarkedMovies, BookmarkedMovie_.id));
//            }
//            if (criteria.getWatchedMoviesId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getWatchedMoviesId(), Movie_.watchedMovies, WatchedMovie_.id));
//            }
//            if (criteria.getRatedMoviesId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getRatedMoviesId(), Movie_.ratedMovies, RatedMovie_.id));
//            }
//            if (criteria.getVideosId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getVideosId(), Movie_.videos, Video_.id));
//            }
//            if (criteria.getCastId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getCastId(), Movie_.casts, MovieCast_.id));
//            }
//            if (criteria.getCrewId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getCrewId(), Movie_.crews, MovieCrew_.id));
//            }
//            if (criteria.getTmdbImagesId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getTmdbImagesId(), Movie_.tmdbImages, TmdbImage_.id));
//            }
//            if (criteria.getGenresId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getGenresId(), Movie_.genres, Genre_.id));
//            }
//            if (criteria.getKeywordsId() != null) {
//                specification = specification.and(buildReferringEntitySpecification(criteria.getKeywordsId(), Movie_.keywords, Keyword_.id));
//            }
        }
        return specification;
    }

}
