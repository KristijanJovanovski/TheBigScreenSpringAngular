package mk.chris.thebigscreen.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import mk.chris.thebigscreen.domain.enumeration.Status;
import org.hibernate.validator.constraints.Length;

/**
 * A Movie.
 */
@Entity
@Table(name = "movies")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Movie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "imdb_id")
    private String imdbId;

    @Column(name = "backdrop_path")
    private String backdropPath;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "original_title")
    private String originalTitle;

    @Column(name = "title")
    private String title;

    @Column(name = "original_language")
    private String originalLanguage;

    @Column(name = "vote_average")
    private Float voteAverage;

    @Column(name = "popularity")
//    TODO: set index on popularity to speed up ordering :)
//    @Index(name = "popularityIndex")
    private Float popularity;

    @Column(name = "vote_count")
    private Long voteCount;

    @Column(name = "budget")
    private Long budget;

    @Column(name = "runtime")
    private Integer runtime;

    @Column(name = "revenue")
    private Long revenue;

    @Column(name = "release_date")
    private LocalDate releaseDate;

//    @Length(min=10,max = 700)
    @Lob
    @Column(name = "overview", columnDefinition = "CLOB")
    private String overview;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BookmarkedMovie> bookmarkedMovies = new HashSet<>();

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WatchedMovie> watchedMovies = new HashSet<>();

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RatedMovie> ratedMovies = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("movie")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Video> videos = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("movie")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MovieCast> cast = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("movie")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MovieCrew> crew = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("movie")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TmdbImage> tmdbImages = new HashSet<>();

    @ManyToMany( cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.REFRESH,
            CascadeType.PERSIST
        },
        fetch = FetchType.EAGER
    )
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "movie_genres",
        joinColumns = @JoinColumn(name="movies_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="genres_id", referencedColumnName="id"))
    private Set<Genre> genres = new HashSet<>();


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImdbId() {
        return imdbId;
    }

    public Movie imdbId(String imdbId) {
        this.imdbId = imdbId;
        return this;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getBackdropPath() {
        return backdropPath;
    }

    public Movie backdropPath(String backdropPath) {
        this.backdropPath = backdropPath;
        return this;
    }

    public void setBackdropPath(String backdropPath) {
        this.backdropPath = backdropPath;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public Movie posterPath(String posterPath) {
        this.posterPath = posterPath;
        return this;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public Movie originalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
        return this;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getTitle() {
        return title;
    }

    public Movie title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public Movie originalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
        return this;
    }

    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public Float getVoteAverage() {
        return voteAverage;
    }

    public Movie voteAverage(Float voteAverage) {
        this.voteAverage = voteAverage;
        return this;
    }

    public void setVoteAverage(Float voteAverage) {
        this.voteAverage = voteAverage;
    }

    public Float getPopularity() {
        return popularity;
    }

    public Movie popularity(Float popularity) {
        this.popularity = popularity;
        return this;
    }

    public void setPopularity(Float popularity) {
        this.popularity = popularity;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public Movie voteCount(Long voteCount) {
        this.voteCount = voteCount;
        return this;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }

    public Long getBudget() {
        return budget;
    }

    public Movie budget(Long budget) {
        this.budget = budget;
        return this;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public Movie runtime(Integer runtime) {
        this.runtime = runtime;
        return this;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public Long getRevenue() {
        return revenue;
    }

    public Movie revenue(Long revenue) {
        this.revenue = revenue;
        return this;
    }

    public void setRevenue(Long revenue) {
        this.revenue = revenue;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public Movie releaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getOverview() {
        return overview;
    }

    public Movie overview(String overview) {
        this.overview = overview;
        return this;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public Status getStatus() {
        return status;
    }

    public Movie status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Set<BookmarkedMovie> getBookmarkedMovies() {
        return bookmarkedMovies;
    }

    public Movie bookmarkedMovies(Set<BookmarkedMovie> bookmarkedMovies) {
        this.bookmarkedMovies = bookmarkedMovies;
        return this;
    }

    public Movie addBookmarkedMovies(BookmarkedMovie bookmarkedMovie) {
        this.bookmarkedMovies.add(bookmarkedMovie);
        bookmarkedMovie.setMovie(this);
        return this;
    }

    public Movie removeBookmarkedMovies(BookmarkedMovie bookmarkedMovie) {
        this.bookmarkedMovies.remove(bookmarkedMovie);
        bookmarkedMovie.setMovie(null);
        return this;
    }

    public void setBookmarkedMovies(Set<BookmarkedMovie> bookmarkedMovies) {
        this.bookmarkedMovies = bookmarkedMovies;
    }

    public Set<WatchedMovie> getWatchedMovies() {
        return watchedMovies;
    }

    public Movie watchedMovies(Set<WatchedMovie> watchedMovies) {
        this.watchedMovies = watchedMovies;
        return this;
    }

    public Movie addWatchedMovies(WatchedMovie watchedMovie) {
        this.watchedMovies.add(watchedMovie);
        watchedMovie.setMovie(this);
        return this;
    }

    public Movie removeWatchedMovies(WatchedMovie watchedMovie) {
        this.watchedMovies.remove(watchedMovie);
        watchedMovie.setMovie(null);
        return this;
    }

    public void setWatchedMovies(Set<WatchedMovie> watchedMovies) {
        this.watchedMovies = watchedMovies;
    }

    public Set<RatedMovie> getRatedMovies() {
        return ratedMovies;
    }

    public Movie ratedMovies(Set<RatedMovie> ratedMovies) {
        this.ratedMovies = ratedMovies;
        return this;
    }

    public Movie addRatedMovies(RatedMovie ratedMovie) {
        this.ratedMovies.add(ratedMovie);
        ratedMovie.setMovie(this);
        return this;
    }

    public Movie removeRatedMovies(RatedMovie ratedMovie) {
        this.ratedMovies.remove(ratedMovie);
        ratedMovie.setMovie(null);
        return this;
    }

    public void setRatedMovies(Set<RatedMovie> ratedMovies) {
        this.ratedMovies = ratedMovies;
    }

    public Set<Video> getVideos() {
        return videos;
    }

    public Movie videos(Set<Video> videos) {
        this.videos = videos;
        return this;
    }

    public Movie addVideos(Video video) {
        this.videos.add(video);
        video.setMovie(this);
        return this;
    }

    public Movie removeVideos(Video video) {
        this.videos.remove(video);
        video.setMovie(null);
        return this;
    }

    public void setVideos(Set<Video> videos) {
        this.videos = videos;
    }

    public Set<MovieCast> getCast() {
        return cast;
    }

    public Movie casts(Set<MovieCast> movieCasts) {
        this.cast = movieCasts;
        return this;
    }

    public Movie addCast(MovieCast movieCast) {
        this.cast.add(movieCast);
        movieCast.setMovie(this);
        return this;
    }

    public Movie removeCast(MovieCast movieCast) {
        this.cast.remove(movieCast);
        movieCast.setMovie(null);
        return this;
    }

    public void setCast(Set<MovieCast> movieCasts) {
        this.cast = movieCasts;
    }

    public Set<MovieCrew> getCrew() {
        return crew;
    }

    public Movie crews(Set<MovieCrew> movieCrews) {
        this.crew = movieCrews;
        return this;
    }

    public Movie addCrew(MovieCrew movieCrew) {
        this.crew.add(movieCrew);
        movieCrew.setMovie(this);
        return this;
    }

    public Movie removeCrew(MovieCrew movieCrew) {
        this.crew.remove(movieCrew);
        movieCrew.setMovie(null);
        return this;
    }

    public void setCrew(Set<MovieCrew> movieCrews) {
        this.crew = movieCrews;
    }

    public Set<TmdbImage> getTmdbImages() {
        return tmdbImages;
    }

    public Movie tmdbImages(Set<TmdbImage> tmdbImages) {
        this.tmdbImages = tmdbImages;
        return this;
    }

    public Movie addTmdbImages(TmdbImage tmdbImage) {
        this.tmdbImages.add(tmdbImage);
        tmdbImage.setMovie(this);
        return this;
    }

    public Movie removeTmdbImages(TmdbImage tmdbImage) {
        this.tmdbImages.remove(tmdbImage);
        tmdbImage.setMovie(null);
        return this;
    }

    public void setTmdbImages(Set<TmdbImage> tmdbImages) {
        this.tmdbImages = tmdbImages;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public Movie genres(Set<Genre> genres) {
        this.genres = genres;
        return this;
    }

    public Movie addGenres(Genre genre) {
        this.genres.add(genre);
        genre.getMovies().add(this);
        return this;
    }

    public Movie removeGenres(Genre genre) {
        this.genres.remove(genre);
        genre.getMovies().remove(this);
        return this;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Movie movie = (Movie) o;
        if (movie.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movie.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Movie{" +
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
