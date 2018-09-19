package mk.chris.thebigscreen.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import mk.chris.thebigscreen.domain.enumeration.Gender;

/**
 * A People.
 */
@Entity
@Table(name = "people")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class People implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "imdb_id")
    private String imdbId;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Lob
    @Column(name = "biography",columnDefinition = "CLOB")
    private String biography;

    @Column(name = "popularity")
    private Float popularity;

    @Column(name = "adult")
    private Boolean adult;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "place_of_birth")
    private String placeOfBirth;

    @Column(name = "profile_path")
    private String profilePath;

    @Column(name = "deathday")
    private LocalDate deathday;

    @OneToMany(mappedBy = "people", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("people")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MovieCast> cast = new HashSet<>();

    @OneToMany(mappedBy = "people", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("people")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MovieCrew> crew = new HashSet<>();

    @OneToMany(mappedBy = "people",cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties("people")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TmdbImage> tmdbImages = new HashSet<>();

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

    public People imdbId(String imdbId) {
        this.imdbId = imdbId;
        return this;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getName() {
        return name;
    }

    public People name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGender() {
        return gender;
    }

    public People gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getBiography() {
        return biography;
    }

    public People biography(String biography) {
        this.biography = biography;
        return this;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Float getPopularity() {
        return popularity;
    }

    public People popularity(Float popularity) {
        this.popularity = popularity;
        return this;
    }

    public void setPopularity(Float popularity) {
        this.popularity = popularity;
    }

    public Boolean isAdult() {
        return adult;
    }

    public People adult(Boolean adult) {
        this.adult = adult;
        return this;
    }

    public void setAdult(Boolean adult) {
        this.adult = adult;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public People birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public People placeOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
        return this;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getProfilePath() {
        return profilePath;
    }

    public People profilePath(String profilePath) {
        this.profilePath = profilePath;
        return this;
    }

    public void setProfilePath(String profilePath) {
        this.profilePath = profilePath;
    }

    public LocalDate getDeathday() {
        return deathday;
    }

    public People deathday(LocalDate deathday) {
        this.deathday = deathday;
        return this;
    }

    public void setDeathday(LocalDate deathday) {
        this.deathday = deathday;
    }

    public Set<MovieCast> getCast() {
        return cast;
    }

    public People casts(Set<MovieCast> movieCasts) {
        this.cast = movieCasts;
        return this;
    }

    public People addCast(MovieCast movieCast) {
        this.cast.add(movieCast);
        movieCast.setPeople(this);
        return this;
    }

    public People removeCast(MovieCast movieCast) {
        this.cast.remove(movieCast);
        movieCast.setPeople(null);
        return this;
    }

    public void setCast(Set<MovieCast> movieCasts) {
        this.cast = movieCasts;
    }

    public Set<MovieCrew> getCrew() {
        return crew;
    }

    public People crews(Set<MovieCrew> movieCrews) {
        this.crew = movieCrews;
        return this;
    }

    public People addCrew(MovieCrew movieCrew) {
        this.crew.add(movieCrew);
        movieCrew.setPeople(this);
        return this;
    }

    public People removeCrew(MovieCrew movieCrew) {
        this.crew.remove(movieCrew);
        movieCrew.setPeople(null);
        return this;
    }

    public void setCrew(Set<MovieCrew> movieCrews) {
        this.crew = movieCrews;
    }

    public Set<TmdbImage> getTmdbImages() {
        return tmdbImages;
    }

    public People tmdbImages(Set<TmdbImage> tmdbImages) {
        this.tmdbImages = tmdbImages;
        return this;
    }

    public People addTmdbImages(TmdbImage tmdbImage) {
        this.tmdbImages.add(tmdbImage);
        tmdbImage.setPeople(this);
        return this;
    }

    public People removeTmdbImages(TmdbImage tmdbImage) {
        this.tmdbImages.remove(tmdbImage);
        tmdbImage.setPeople(null);
        return this;
    }

    public void setTmdbImages(Set<TmdbImage> tmdbImages) {
        this.tmdbImages = tmdbImages;
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
        People people = (People) o;
        if (people.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), people.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "People{" +
            "id=" + getId() +
            ", imdbId='" + getImdbId() + "'" +
            ", name='" + getName() + "'" +
            ", gender='" + getGender() + "'" +
            ", biography='" + getBiography() + "'" +
            ", popularity=" + getPopularity() +
            ", adult='" + isAdult() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", placeOfBirth='" + getPlaceOfBirth() + "'" +
            ", profilePath='" + getProfilePath() + "'" +
            ", deathday='" + getDeathday() + "'" +
            "}";
    }
}
