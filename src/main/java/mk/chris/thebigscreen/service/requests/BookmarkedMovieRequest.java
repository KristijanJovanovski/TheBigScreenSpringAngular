package mk.chris.thebigscreen.service.requests;

import javax.validation.constraints.NotNull;
import java.time.Instant;

public class BookmarkedMovieRequest {

    @NotNull
    private Long movieId;

    private Instant createdOn;

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

}
