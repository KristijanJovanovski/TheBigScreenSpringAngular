package mk.chris.thebigscreen.domain;

import mk.chris.thebigscreen.domain.enumeration.VideoType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Video.
 */
@Entity
@Table(name = "videos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Video implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "video_key", nullable = false)
    private String videoKey;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "video_site")
    private String videoSite;

    @Column(name = "video_size")
    private Integer videoSize;

    @Column(name = "video_type")
    private VideoType videoType;

    @ManyToOne
    private Movie movie;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideoKey() {
        return videoKey;
    }

    public Video videoKey(String videoKey) {
        this.videoKey = videoKey;
        return this;
    }

    public void setVideoKey(String videoKey) {
        this.videoKey = videoKey;
    }

    public String getName() {
        return name;
    }

    public Video name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVideoSite() {
        return videoSite;
    }

    public Video videoSite(String videoSite) {
        this.videoSite = videoSite;
        return this;
    }

    public void setVideoSite(String videoSite) {
        this.videoSite = videoSite;
    }

    public Integer getVideoSize() {
        return videoSize;
    }

    public Video videoSize(Integer videoSize) {
        this.videoSize = videoSize;
        return this;
    }

    public void setVideoSize(Integer videoSize) {
        this.videoSize = videoSize;
    }

    public VideoType getVideoType() {
        return videoType;
    }

    public Video videoType(VideoType videoType) {
        this.videoType = videoType;
        return this;
    }

    public void setVideoType(VideoType videoType) {
        this.videoType = videoType;
    }

    public Movie getMovie() {
        return movie;
    }

    public Video movie(Movie movie) {
        this.movie = movie;
        return this;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
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
        Video video = (Video) o;
        if (video.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), video.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Video{" +
            "id=" + getId() +
            ", videoKey='" + getVideoKey() + "'" +
            ", name='" + getName() + "'" +
            ", videoSite='" + getVideoSite() + "'" +
            ", videoSize=" + getVideoSize() +
            ", videoType='" + getVideoType() + "'" +
            "}";
    }
}
