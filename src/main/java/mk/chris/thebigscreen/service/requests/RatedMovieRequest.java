package mk.chris.thebigscreen.service.requests;

import javax.validation.constraints.NotNull;
import java.time.Instant;

public class RatedMovieRequest {

    @NotNull
    private Long movieId;

    @NotNull
    private Float rate;

    private Instant createdOn;

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

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
