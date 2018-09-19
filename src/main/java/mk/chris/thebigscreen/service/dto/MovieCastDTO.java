package mk.chris.thebigscreen.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the MovieCast entity.
 */
public class MovieCastDTO implements Serializable {

    private Long id;

    private String movieRole;

    @Min(value = 0)
    private Integer castOrder;

    private Long movieId;

    private Long peopleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovieRole() {
        return movieRole;
    }

    public void setMovieRole(String movieRole) {
        this.movieRole = movieRole;
    }

    public Integer getCastOrder() {
        return castOrder;
    }

    public void setCastOrder(Integer castOrder) {
        this.castOrder = castOrder;
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

        MovieCastDTO movieCastDTO = (MovieCastDTO) o;
        if(movieCastDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movieCastDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovieCastDTO{" +
            "id=" + getId() +
            ", movieRole='" + getMovieRole() + "'" +
            ", castOrder=" + getCastOrder() +
            "}";
    }
}
