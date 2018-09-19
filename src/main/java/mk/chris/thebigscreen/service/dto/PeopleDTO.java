package mk.chris.thebigscreen.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import mk.chris.thebigscreen.domain.enumeration.Gender;

/**
 * A DTO for the People entity.
 */
public class PeopleDTO implements Serializable {

    private Long id;

    private String imdbId;

    @NotNull
    private String name;

    private Gender gender;

    private String biography;

    private Float popularity;

    private Boolean adult;

    private LocalDate birthday;

    private String placeOfBirth;

    private String profilePath;

    private LocalDate deathday;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Float getPopularity() {
        return popularity;
    }

    public void setPopularity(Float popularity) {
        this.popularity = popularity;
    }

    public Boolean isAdult() {
        return adult;
    }

    public void setAdult(Boolean adult) {
        this.adult = adult;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getProfilePath() {
        return profilePath;
    }

    public void setProfilePath(String profilePath) {
        this.profilePath = profilePath;
    }

    public LocalDate getDeathday() {
        return deathday;
    }

    public void setDeathday(LocalDate deathday) {
        this.deathday = deathday;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PeopleDTO peopleDTO = (PeopleDTO) o;
        if(peopleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), peopleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PeopleDTO{" +
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
