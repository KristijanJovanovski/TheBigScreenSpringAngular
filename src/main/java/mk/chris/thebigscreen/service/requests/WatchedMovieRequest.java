package mk.chris.thebigscreen.service.requests;

import javax.validation.constraints.NotNull;
import java.time.Instant;

public class WatchedMovieRequest {

    @NotNull
    private Long movieId;
//    @NotNull
//    private Integer plays;

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

//    public Integer getPlays() {
//        return plays;
//    }

//    public void setPlays(Integer plays) {
//        this.plays = plays;
//    }

}
