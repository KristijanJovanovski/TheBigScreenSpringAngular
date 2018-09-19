package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import io.github.jhipster.service.filter.InstantFilter;




/**
 * Criteria class for the BookmarkedMovie entity. This class is used in BookmarkedMovieResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /bookmarked-movies?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class BookmarkedMovieCriteria implements Serializable {
    private static final long serialVersionUID = 1L;

    private InstantFilter createdOn;

    private LongFilter movieId;

//    private LongFilter userId;

    public BookmarkedMovieCriteria() {
    }

    public InstantFilter getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(InstantFilter createdOn) {
        this.createdOn = createdOn;
    }

    public LongFilter getMovieId() {
        return movieId;
    }

    public void setMovieId(LongFilter movieId) {
        this.movieId = movieId;
    }

//    public LongFilter getUserId() {
//        return userId;
//    }
//
//    public void setUserId(LongFilter userId) {
//        this.userId = userId;
//    }

    @Override
    public String toString() {
        return "BookmarkedMovieCriteria{" +
                (createdOn != null ? "createdOn=" + createdOn + ", " : "") +
                (movieId != null ? "movieId=" + movieId + ", " : "") +
//                (userId != null ? "userId=" + userId + ", " : "") +
            "}";
    }

}
