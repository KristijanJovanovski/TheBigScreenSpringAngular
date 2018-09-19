package mk.chris.thebigscreen.service.dto;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import mk.chris.thebigscreen.domain.enumeration.Status;

/**
 * A DTO for the Movie entity.
 */
public class MovieDTO implements Serializable {

    private Long id;

    private String imdbId;

    private String backdropPath;

    private String posterPath;

    private String originalTitle;

    private String title;

    private String originalLanguage;

    private Float voteAverage;

    private Float popularity;

    private Long voteCount;

    private Long budget;

    private Integer runtime;

    private Long revenue;

    private LocalDate releaseDate;

    private String overview;

    private Status status;

    private Set<GenreDTO> genres = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getBackdropPath() {
        return backdropPath;
    }

    public void setBackdropPath(String backdropPath) {
        this.backdropPath = backdropPath;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public Float getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(Float voteAverage) {
        this.voteAverage = voteAverage;
    }

    public Float getPopularity() {
        return popularity;
    }

    public void setPopularity(Float popularity) {
        this.popularity = popularity;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }

    public Long getBudget() {
        return budget;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public Long getRevenue() {
        return revenue;
    }

    public void setRevenue(Long revenue) {
        this.revenue = revenue;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Set<GenreDTO> getGenres() {
        return genres;
    }

    public void setGenres(Set<GenreDTO> genres) {
        this.genres = genres;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MovieDTO movieDTO = (MovieDTO) o;
        if(movieDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movieDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovieDTO{" +
            "id=" + getId() +
            ", imdbId='" + getImdbId() + "'" +
            ", backdropPath='" + getBackdropPath() + "'" +
            ", posterPath='" + getPosterPath() + "'" +
            ", originalTitle='" + getOriginalTitle() + "'" +
            ", title='" + getTitle() + "'" +
            ", originalLanguage='" + getOriginalLanguage() + "'" +
            ", voteAverage=" + getVoteAverage() +
            ", popularity=" + getPopularity() +
            ", voteCount=" + getVoteCount() +
            ", budget=" + getBudget() +
            ", runtime=" + getRuntime() +
            ", revenue=" + getRevenue() +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", overview='" + getOverview() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
