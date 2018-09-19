package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;

import io.github.jhipster.service.filter.*;
import mk.chris.thebigscreen.domain.enumeration.Status;


/**
 * Criteria class for the Movie entity. This class is used in MovieResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /movies?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MovieCriteria implements Serializable {
    /**
     * Class for filtering Status
     */
    public static class StatusFilter extends Filter<Status> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter imdbId;

//    private StringFilter backdropPath;

//    private StringFilter posterPath;

    private StringFilter originalTitle;

    private StringFilter title;

    private StringFilter originalLanguage;

    private FloatFilter voteAverage;

    private FloatFilter popularity;

    private LongFilter voteCount;

    private LongFilter budget;

    private IntegerFilter runtime;

    private LongFilter revenue;

    private LocalDateFilter releaseDate;

//    private StringFilter overview;

    private StatusFilter status;
//  TODO: fix this with composite key
//    private LongFilter bookmarkedMoviesId;
//
//    private LongFilter watchedMoviesId;
//
//    private LongFilter ratedMoviesId;

//    private LongFilter videosId;

//    private LongFilter castId;

//    private LongFilter crewId;

//    private LongFilter tmdbImagesId;

//    private LongFilter genresId;

//    private LongFilter keywordsId;

    public MovieCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getImdbId() {
        return imdbId;
    }

    public void setImdbId(StringFilter imdbId) {
        this.imdbId = imdbId;
    }

//    public StringFilter getBackdropPath() {
//        return backdropPath;
//    }
//
//    public void setBackdropPath(StringFilter backdropPath) {
//        this.backdropPath = backdropPath;
//    }
//
//    public StringFilter getPosterPath() {
//        return posterPath;
//    }
//
//    public void setPosterPath(StringFilter posterPath) {
//        this.posterPath = posterPath;
//    }

    public StringFilter getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(StringFilter originalTitle) {
        this.originalTitle = originalTitle;
    }

    public StringFilter getTitle() {
        return title;
    }

    public void setTitle(StringFilter title) {
        this.title = title;
    }

    public StringFilter getOriginalLanguage() {
        return originalLanguage;
    }

    public void setOriginalLanguage(StringFilter originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public FloatFilter getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(FloatFilter voteAverage) {
        this.voteAverage = voteAverage;
    }

    public FloatFilter getPopularity() {
        return popularity;
    }

    public void setPopularity(FloatFilter popularity) {
        this.popularity = popularity;
    }

    public LongFilter getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(LongFilter voteCount) {
        this.voteCount = voteCount;
    }

    public LongFilter getBudget() {
        return budget;
    }

    public void setBudget(LongFilter budget) {
        this.budget = budget;
    }

    public IntegerFilter getRuntime() {
        return runtime;
    }

    public void setRuntime(IntegerFilter runtime) {
        this.runtime = runtime;
    }

    public LongFilter getRevenue() {
        return revenue;
    }

    public void setRevenue(LongFilter revenue) {
        this.revenue = revenue;
    }

    public LocalDateFilter getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDateFilter releaseDate) {
        this.releaseDate = releaseDate;
    }

//    public StringFilter getOverview() {
//        return overview;
//    }
//
//    public void setOverview(StringFilter overview) {
//        this.overview = overview;
//    }

    public StatusFilter getStatus() {
        return status;
    }

    public void setStatus(StatusFilter status) {
        this.status = status;
    }

//    public LongFilter getBookmarkedMoviesId() {
//        return bookmarkedMoviesId;
//    }
//
//    public void setBookmarkedMoviesId(LongFilter bookmarkedMoviesId) {
//        this.bookmarkedMoviesId = bookmarkedMoviesId;
//    }
//
//    public LongFilter getWatchedMoviesId() {
//        return watchedMoviesId;
//    }
//
//    public void setWatchedMoviesId(LongFilter watchedMoviesId) {
//        this.watchedMoviesId = watchedMoviesId;
//    }
//
//    public LongFilter getRatedMoviesId() {
//        return ratedMoviesId;
//    }
//
//    public void setRatedMoviesId(LongFilter ratedMoviesId) {
//        this.ratedMoviesId = ratedMoviesId;
//    }

//    public LongFilter getVideosId() {
//        return videosId;
//    }
//
//    public void setVideosId(LongFilter videosId) {
//        this.videosId = videosId;
//    }

//    public LongFilter getCastId() {
//        return castId;
//    }
//
//    public void setCastId(LongFilter castId) {
//        this.castId = castId;
//    }
//
//    public LongFilter getCrewId() {
//        return crewId;
//    }
//
//    public void setCrewId(LongFilter crewId) {
//        this.crewId = crewId;
//    }

//    public LongFilter getTmdbImagesId() {
//        return tmdbImagesId;
//    }
//
//    public void setTmdbImagesId(LongFilter tmdbImagesId) {
//        this.tmdbImagesId = tmdbImagesId;
//    }

//    public LongFilter getGenresId() {
//        return genresId;
//    }
//
//    public void setGenresId(LongFilter genresId) {
//        this.genresId = genresId;
//    }
//
//    public LongFilter getKeywordsId() {
//        return keywordsId;
//    }
//
//    public void setKeywordsId(LongFilter keywordsId) {
//        this.keywordsId = keywordsId;
//    }

    @Override
    public String toString() {
        return "MovieCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (imdbId != null ? "imdbId=" + imdbId + ", " : "") +
//                (backdropPath != null ? "backdropPath=" + backdropPath + ", " : "") +
//                (posterPath != null ? "posterPath=" + posterPath + ", " : "") +
                (originalTitle != null ? "originalTitle=" + originalTitle + ", " : "") +
                (title != null ? "title=" + title + ", " : "") +
                (originalLanguage != null ? "originalLanguage=" + originalLanguage + ", " : "") +
                (voteAverage != null ? "voteAverage=" + voteAverage + ", " : "") +
                (popularity != null ? "popularity=" + popularity + ", " : "") +
                (voteCount != null ? "voteCount=" + voteCount + ", " : "") +
                (budget != null ? "budget=" + budget + ", " : "") +
                (runtime != null ? "runtime=" + runtime + ", " : "") +
                (revenue != null ? "revenue=" + revenue + ", " : "") +
                (releaseDate != null ? "releaseDate=" + releaseDate + ", " : "") +
//                (overview != null ? "overview=" + overview + ", " : "") +
                (status != null ? "status=" + status + ", " : "") +
//                (bookmarkedMoviesId != null ? "bookmarkedMoviesId=" + bookmarkedMoviesId + ", " : "") +
//                (watchedMoviesId != null ? "watchedMoviesId=" + watchedMoviesId + ", " : "") +
//                (ratedMoviesId != null ? "ratedMoviesId=" + ratedMoviesId + ", " : "") +
//                (videosId != null ? "videosId=" + videosId + ", " : "") +
//                (castId != null ? "castId=" + castId + ", " : "") +
//                (crewId != null ? "crewId=" + crewId + ", " : "") +
////                (tmdbImagesId != null ? "tmdbImagesId=" + tmdbImagesId + ", " : "") +
//                (genresId != null ? "genresId=" + genresId + ", " : "") +
//                (keywordsId != null ? "keywordsId=" + keywordsId + ", " : "") +
            "}";
    }

}
