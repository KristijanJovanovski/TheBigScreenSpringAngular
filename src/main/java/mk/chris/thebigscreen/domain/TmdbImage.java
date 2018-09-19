package mk.chris.thebigscreen.domain;

import mk.chris.thebigscreen.domain.enumeration.ImageType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TmdbImage.
 */
@Entity
@Table(name = "tmdb_images")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TmdbImage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "aspect_ratio")
    private Float aspectRatio;

    @NotNull
    @Column(name = "filepath", nullable = false)
    private String filepath;

    @NotNull
    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "iso_6391")
    private String iso6391;

    @NotNull
    @Column(name = "width", nullable = false)
    private Integer width;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "image_type", nullable = false)
    private ImageType imageType;

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

    public Float getAspectRatio() {
        return aspectRatio;
    }

    public TmdbImage aspectRatio(Float aspectRatio) {
        this.aspectRatio = aspectRatio;
        return this;
    }

    public void setAspectRatio(Float aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    public String getFilepath() {
        return filepath;
    }

    public TmdbImage filepath(String filepath) {
        this.filepath = filepath;
        return this;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Integer getHeight() {
        return height;
    }

    public TmdbImage height(Integer height) {
        this.height = height;
        return this;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getIso6391() {
        return iso6391;
    }

    public TmdbImage iso6391(String iso6391) {
        this.iso6391 = iso6391;
        return this;
    }

    public void setIso6391(String iso6391) {
        this.iso6391 = iso6391;
    }

    public Integer getWidth() {
        return width;
    }

    public TmdbImage width(Integer width) {
        this.width = width;
        return this;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public ImageType getImageType() {
        return imageType;
    }

    public TmdbImage imageType(ImageType imageType) {
        this.imageType = imageType;
        return this;
    }

    public void setImageType(ImageType imageType) {
        this.imageType = imageType;
    }

    public Movie getMovie() {
        return movie;
    }

    public TmdbImage movie(Movie movie) {
        this.movie = movie;
        return this;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public People getPeople() {
        return people;
    }

    public TmdbImage people(People people) {
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
        TmdbImage tmdbImage = (TmdbImage) o;
        if (tmdbImage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tmdbImage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TmdbImage{" +
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
