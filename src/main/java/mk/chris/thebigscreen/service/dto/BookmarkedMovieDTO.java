package mk.chris.thebigscreen.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BookmarkedMovie entity.
 */
public class BookmarkedMovieDTO implements Serializable {

    @NotNull
    private Instant createdOn;
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
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BookmarkedMovieDTO bookmarkedMovieDTO = (BookmarkedMovieDTO) o;
        if(bookmarkedMovieDTO.getMovieId() == null || getMovieId() == null &&
            bookmarkedMovieDTO.getUserId() == null || getUserId() == null) {
            return false;
        }
        return Objects.equals(getMovieId(), bookmarkedMovieDTO.getMovieId()) &&
            Objects.equals(getUserId(), bookmarkedMovieDTO.getUserId());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getMovieId(), getUserId());
    }

    @Override
    public String toString() {
        return "BookmarkedMovieDTO{" +
            "createdOn=" + createdOn +
            ", movieId=" + movieId +
            ", userId=" + userId +
            '}';
    }
}
