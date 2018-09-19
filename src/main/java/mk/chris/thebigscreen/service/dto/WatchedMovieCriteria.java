package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;

import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;

import io.github.jhipster.service.filter.InstantFilter;




/**
 * Criteria class for the WatchedMovie entity. This class is used in WatchedMovieResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /watched-movies?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class WatchedMovieCriteria implements Serializable {
    private static final long serialVersionUID = 1L;

    private InstantFilter createdOn;

//    private IntegerFilter plays;

    private LongFilter movieId;

    public WatchedMovieCriteria() {
    }

    public InstantFilter getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(InstantFilter createdOn) {
        this.createdOn = createdOn;
    }

//    public IntegerFilter getPlays() {
//        return plays;
//    }
//
//    public void setPlays(IntegerFilter plays) {
//        this.plays = plays;
//    }

    public LongFilter getMovieId() {
        return movieId;
    }

    public void setMovieId(LongFilter movieId) {
        this.movieId = movieId;
    }


    @Override
    public String toString() {
        return "WatchedMovieCriteria{" +
                (createdOn != null ? "createdOn=" + createdOn + ", " : "") +
//                (plays != null ? "plays=" + plays + ", " : "") +
                (movieId != null ? "movieId=" + movieId + ", " : "") +
            "}";
    }

}
