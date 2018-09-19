package mk.chris.thebigscreen.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the WatchedMovie entity.
 */
public class WatchedMovieDTO implements Serializable {

    @NotNull
    private Instant createdOn;
//
//    @NotNull
//    private Integer plays;
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
//
//    public Integer getPlays() {
//        return plays;
//    }
//
//    public void setPlays(Integer plays) {
//        this.plays = plays;
//    }

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
        WatchedMovieDTO that = (WatchedMovieDTO) o;
        return Objects.equals(getMovieId(), that.getMovieId()) &&
            Objects.equals(getUserId(), that.getUserId());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getMovieId(), getUserId());
    }

    @Override
    public String toString() {
        return "WatchedMovieDTO{" +
            "createdOn=" + createdOn +
//            ", plays=" + plays +
            ", movieId=" + movieId +
            ", userId=" + userId +
            '}';
    }
}
