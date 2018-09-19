package mk.chris.thebigscreen.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the MovieCrew entity.
 */
public class MovieCrewDTO implements Serializable {

    private Long id;

    private String job;

    private String department;

    private Long movieId;

    private Long peopleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getPeopleId() {
        return peopleId;
    }

    public void setPeopleId(Long peopleId) {
        this.peopleId = peopleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MovieCrewDTO movieCrewDTO = (MovieCrewDTO) o;
        if(movieCrewDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movieCrewDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovieCrewDTO{" +
            "id=" + getId() +
            ", job='" + getJob() + "'" +
            ", department='" + getDepartment() + "'" +
            "}";
    }
}
