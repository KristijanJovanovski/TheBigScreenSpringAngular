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
 * Criteria class for the RatedMovie entity. This class is used in RatedMovieResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /rated-movies?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class RatedMovieCriteria implements Serializable {
    private static final long serialVersionUID = 1L;

    private InstantFilter createdOn;

    private FloatFilter rate;

    private LongFilter movieId;

    public RatedMovieCriteria() {
    }

    public InstantFilter getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(InstantFilter createdOn) {
        this.createdOn = createdOn;
    }

    public FloatFilter getRate() {
        return rate;
    }

    public void setRate(FloatFilter rate) {
        this.rate = rate;
    }

    public LongFilter getMovieId() {
        return movieId;
    }

    public void setMovieId(LongFilter movieId) {
        this.movieId = movieId;
    }


    @Override
    public String toString() {
        return "RatedMovieCriteria{" +
                (createdOn != null ? "createdOn=" + createdOn + ", " : "") +
                (rate != null ? "rate=" + rate + ", " : "") +
                (movieId != null ? "movieId=" + movieId + ", " : "") +
            "}";
    }

}
