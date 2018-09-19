package mk.chris.thebigscreen.service.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import mk.chris.thebigscreen.domain.Movie;
import mk.chris.thebigscreen.service.dto.MovieDTO;
import springfox.documentation.spring.web.json.Json;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class MovieResponse extends Movie {

    private Instant bookmarkedOn;

    private Instant watchedOn;

    private Instant ratedOn;

    private Float rate;

    public MovieResponse() {
    }


    public MovieResponse(Movie movie) {
        this.setId(movie.getId());
        this.setBackdropPath(movie.getBackdropPath());
        this.setBudget(movie.getBudget());
        this.setImdbId(movie.getImdbId());
        this.setOriginalLanguage(movie.getOriginalLanguage());
        this.setOriginalTitle(movie.getOriginalTitle());
        this.setOverview(movie.getOverview());
        this.setPopularity(movie.getPopularity());
        this.setRevenue(movie.getRevenue());
        this.setVoteCount(movie.getVoteCount());
        this.setVoteAverage(movie.getVoteAverage());
        this.setTitle(movie.getTitle());
        this.setStatus(movie.getStatus());
        this.setRuntime(movie.getRuntime());
        this.setReleaseDate(movie.getReleaseDate());
        this.setPosterPath(movie.getPosterPath());
    }

    public Instant getBookmarkedOn() {
        return bookmarkedOn;
    }

    public void setBookmarkedOn(Instant bookmarkedOn) {
        this.bookmarkedOn = bookmarkedOn;
    }

    public Instant getWatchedOn() {
        return watchedOn;
    }

    public void setWatchedOn(Instant watchedOn) {
        this.watchedOn = watchedOn;
    }

    public Instant getRatedOn() {
        return ratedOn;
    }

    public void setRatedOn(Instant ratedOn) {
        this.ratedOn = ratedOn;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }
}
