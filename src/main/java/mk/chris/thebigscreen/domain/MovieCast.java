package mk.chris.thebigscreen.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MovieCast.
 */
@Entity
@Table(name = "movie_cast")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MovieCast implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "movie_role")
    private String movieRole;

    @Min(value = 0)
    @Column(name = "cast_order")
    private Integer castOrder;

    @ManyToOne
    private Movie movie;

    @ManyToOne
    private People people;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovieRole() {
        return movieRole;
    }

    public MovieCast character(String movieRole) {
        this.movieRole = movieRole;
        return this;
    }

    public void setMovieRole(String movieRole) {
        this.movieRole = movieRole;
    }

    public Integer getCastOrder() {
        return castOrder;
    }

    public MovieCast order(Integer castOrder) {
        this.castOrder = castOrder;
        return this;
    }

    public void setCastOrder(Integer castOrder) {
        this.castOrder = castOrder;
    }

    public Movie getMovie() {
        return movie;
    }

    public MovieCast movie(Movie movie) {
        this.movie = movie;
        return this;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public People getPeople() {
        return people;
    }

    public MovieCast people(People people) {
        this.people = people;
        return this;
    }

    public void setPeople(People people) {
        this.people = people;
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
        MovieCast movieCast = (MovieCast) o;
        if (movieCast.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movieCast.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovieCast{" +
            "id=" + getId() +
            ", movieRole='" + getMovieRole() + "'" +
            ", castOrder=" + getCastOrder() +
            "}";
    }
}
