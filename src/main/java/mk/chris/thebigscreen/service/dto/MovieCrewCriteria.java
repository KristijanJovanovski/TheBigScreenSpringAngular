package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the MovieCrew entity. This class is used in MovieCrewResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /movie-crews?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MovieCrewCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter job;

    private StringFilter department;

    private LongFilter movieId;

    private LongFilter peopleId;

    public MovieCrewCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getJob() {
        return job;
    }

    public void setJob(StringFilter job) {
        this.job = job;
    }

    public StringFilter getDepartment() {
        return department;
    }

    public void setDepartment(StringFilter department) {
        this.department = department;
    }

    public LongFilter getMovieId() {
        return movieId;
    }

    public void setMovieId(LongFilter movieId) {
        this.movieId = movieId;
    }

    public LongFilter getPeopleId() {
        return peopleId;
    }

    public void setPeopleId(LongFilter peopleId) {
        this.peopleId = peopleId;
    }

    @Override
    public String toString() {
        return "MovieCrewCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (job != null ? "job=" + job + ", " : "") +
                (department != null ? "department=" + department + ", " : "") +
                (movieId != null ? "movieId=" + movieId + ", " : "") +
                (peopleId != null ? "peopleId=" + peopleId + ", " : "") +
            "}";
    }

}
