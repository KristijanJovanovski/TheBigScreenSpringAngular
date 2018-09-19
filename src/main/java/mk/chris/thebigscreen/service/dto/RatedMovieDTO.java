package mk.chris.thebigscreen.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the RatedMovie entity.
 */
public class RatedMovieDTO implements Serializable {
    @NotNull
    private Instant createdOn;
    @NotNull
    private Float rate;
    @NotNull
    private Long movieId;
    @NotNull
    private Long userId;

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long profileId) {
        this.userId = profileId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatedMovieDTO that = (RatedMovieDTO) o;
        return Objects.equals(getMovieId(), that.getMovieId()) &&
            Objects.equals(getUserId(), that.getUserId());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getMovieId(), getUserId());
    }

    @Override
    public String toString() {
        return "RatedMovieDTO{" +
            "createdOn=" + createdOn +
            ", rate=" + rate +
            ", movieId=" + movieId +
            ", userId=" + userId +
            '}';
    }
}
