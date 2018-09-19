package mk.chris.thebigscreen.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MovieCrew.
 */
@Entity
@Table(name = "movie_crew")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MovieCrew implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "job")
    private String job;

    @Column(name = "department")
    private String department;

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

    public String getJob() {
        return job;
    }

    public MovieCrew job(String job) {
        this.job = job;
        return this;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getDepartment() {
        return department;
    }

    public MovieCrew department(String department) {
        this.department = department;
        return this;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Movie getMovie() {
        return movie;
    }

    public MovieCrew movie(Movie movie) {
        this.movie = movie;
        return this;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public People getPeople() {
        return people;
    }

    public MovieCrew people(People people) {
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
        MovieCrew movieCrew = (MovieCrew) o;
        if (movieCrew.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movieCrew.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovieCrew{" +
            "id=" + getId() +
            ", job='" + getJob() + "'" +
            ", department='" + getDepartment() + "'" +
            "}";
    }
}
