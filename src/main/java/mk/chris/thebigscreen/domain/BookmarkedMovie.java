package mk.chris.thebigscreen.domain;

import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A BookmarkedMovie.
 */
@Entity
@Table(name = "bookmarked_movies")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@IdClass(UserMoviePK.class)
public class BookmarkedMovie implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private Long user_id;
    @Id
    private Long movie_id;

    @NotNull
    @Column(name = "created_on", nullable = false)
    private Instant createdOn;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @NotNull
    @JoinColumn(name = "user_id", insertable=false, updatable=false, referencedColumnName = "id")
    private User user;

    // Usualy movies details are needed
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name = "movie_id", insertable=false, updatable=false, referencedColumnName = "id")
    private Movie movie;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove


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

    public Instant getCreatedOn() {
        return createdOn;
    }

    public BookmarkedMovie createdOn(Instant date) {
        this.createdOn = date;
        return this;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public User getUser() {
        return user;
    }

    public BookmarkedMovie user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public BookmarkedMovie movie(Movie movie) {
        this.movie = movie;
        return this;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

}
