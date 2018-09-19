package mk.chris.thebigscreen.domain.compositePKs;

import java.io.Serializable;
import java.util.Objects;

public class UserMoviePK implements Serializable {
    private Long user_id;
    private Long movie_id;

    public UserMoviePK() {
    }

    public UserMoviePK(Long user_id, Long movie_id) {
        this.user_id = user_id;
        this.movie_id = movie_id;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long userId) {
        this.user_id = userId;
    }

    public Long getMovieId() {
        return movie_id;
    }

    public void setMovieId(Long movieId) {
        this.movie_id = movieId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserMoviePK that = (UserMoviePK) o;
        return Objects.equals(getUserId(), that.getUserId()) &&
                Objects.equals(getMovieId(), that.getMovieId());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getUserId(), getMovieId());
    }
}
