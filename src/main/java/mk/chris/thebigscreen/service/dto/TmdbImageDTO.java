package mk.chris.thebigscreen.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import mk.chris.thebigscreen.domain.enumeration.ImageType;

/**
 * A DTO for the TmdbImage entity.
 */
public class TmdbImageDTO implements Serializable {

    private Long id;

    private Float aspectRatio;

    @NotNull
    private String filepath;

    @NotNull
    private Integer height;

    private String iso6391;

    @NotNull
    private Integer width;

    @NotNull
    private ImageType imageType;

    private Long movieId;

    private Long peopleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAspectRatio() {
        return aspectRatio;
    }

    public void setAspectRatio(Float aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getIso6391() {
        return iso6391;
    }

    public void setIso6391(String iso6391) {
        this.iso6391 = iso6391;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public ImageType getImageType() {
        return imageType;
    }

    public void setImageType(ImageType imageType) {
        this.imageType = imageType;
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

        TmdbImageDTO tmdbImageDTO = (TmdbImageDTO) o;
        if(tmdbImageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tmdbImageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TmdbImageDTO{" +
            "id=" + getId() +
            ", aspectRatio=" + getAspectRatio() +
            ", filepath='" + getFilepath() + "'" +
            ", height=" + getHeight() +
            ", iso6391='" + getIso6391() + "'" +
            ", width=" + getWidth() +
            ", imageType='" + getImageType() + "'" +
            "}";
    }
}
