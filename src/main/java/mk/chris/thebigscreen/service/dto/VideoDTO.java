package mk.chris.thebigscreen.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import mk.chris.thebigscreen.domain.enumeration.VideoType;

/**
 * A DTO for the Video entity.
 */
public class VideoDTO implements Serializable {

    private Long id;

    @NotNull
    private String videoKey;

    @NotNull
    private String name;

    private String videoSite;

    private Integer videoSize;

    private VideoType videoType;

    private Long movieId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideoKey() {
        return videoKey;
    }

    public void setVideoKey(String videoKey) {
        this.videoKey = videoKey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVideoSite() {
        return videoSite;
    }

    public void setVideoSite(String videoSite) {
        this.videoSite = videoSite;
    }

    public Integer getVideoSize() {
        return videoSize;
    }

    public void setVideoSize(Integer videoSize) {
        this.videoSize = videoSize;
    }

    public VideoType getVideoType() {
        return videoType;
    }

    public void setVideoType(VideoType videoType) {
        this.videoType = videoType;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VideoDTO videoDTO = (VideoDTO) o;
        if(videoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), videoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VideoDTO{" +
            "id=" + getId() +
            ", videoKey='" + getVideoKey() + "'" +
            ", name='" + getName() + "'" +
            ", videoSite='" + getVideoSite() + "'" +
            ", videoSize=" + getVideoSize() +
            ", videoType='" + getVideoType() + "'" +
            "}";
    }
}
