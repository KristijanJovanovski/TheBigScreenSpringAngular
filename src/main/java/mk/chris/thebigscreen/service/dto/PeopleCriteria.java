package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;

import io.github.jhipster.service.filter.*;
import mk.chris.thebigscreen.domain.enumeration.Gender;


/**
 * Criteria class for the People entity. This class is used in PeopleResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /people?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PeopleCriteria implements Serializable {
    /**
     * Class for filtering Gender
     */
    public static class GenderFilter extends Filter<Gender> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter imdbId;

    private StringFilter name;

    private GenderFilter gender;

    private StringFilter biography;

    private FloatFilter popularity;

    private BooleanFilter adult;

    private LocalDateFilter birthday;

    private StringFilter placeOfBirth;

    private StringFilter profilePath;

    private LocalDateFilter deathday;

    private LongFilter castId;

    private LongFilter crewId;

    private LongFilter tmdbImagesId;

    public PeopleCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getImdbId() {
        return imdbId;
    }

    public void setImdbId(StringFilter imdbId) {
        this.imdbId = imdbId;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public GenderFilter getGender() {
        return gender;
    }

    public void setGender(GenderFilter gender) {
        this.gender = gender;
    }

    public StringFilter getBiography() {
        return biography;
    }

    public void setBiography(StringFilter biography) {
        this.biography = biography;
    }

    public FloatFilter getPopularity() {
        return popularity;
    }

    public void setPopularity(FloatFilter popularity) {
        this.popularity = popularity;
    }

    public BooleanFilter getAdult() {
        return adult;
    }

    public void setAdult(BooleanFilter adult) {
        this.adult = adult;
    }

    public LocalDateFilter getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDateFilter birthday) {
        this.birthday = birthday;
    }

    public StringFilter getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(StringFilter placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public StringFilter getProfilePath() {
        return profilePath;
    }

    public void setProfilePath(StringFilter profilePath) {
        this.profilePath = profilePath;
    }

    public LocalDateFilter getDeathday() {
        return deathday;
    }

    public void setDeathday(LocalDateFilter deathday) {
        this.deathday = deathday;
    }

    public LongFilter getCastId() {
        return castId;
    }

    public void setCastId(LongFilter castId) {
        this.castId = castId;
    }

    public LongFilter getCrewId() {
        return crewId;
    }

    public void setCrewId(LongFilter crewId) {
        this.crewId = crewId;
    }

    public LongFilter getTmdbImagesId() {
        return tmdbImagesId;
    }

    public void setTmdbImagesId(LongFilter tmdbImagesId) {
        this.tmdbImagesId = tmdbImagesId;
    }

    @Override
    public String toString() {
        return "PeopleCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (imdbId != null ? "imdbId=" + imdbId + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (gender != null ? "gender=" + gender + ", " : "") +
                (biography != null ? "biography=" + biography + ", " : "") +
                (popularity != null ? "popularity=" + popularity + ", " : "") +
                (adult != null ? "adult=" + adult + ", " : "") +
                (birthday != null ? "birthday=" + birthday + ", " : "") +
                (placeOfBirth != null ? "placeOfBirth=" + placeOfBirth + ", " : "") +
                (profilePath != null ? "profilePath=" + profilePath + ", " : "") +
                (deathday != null ? "deathday=" + deathday + ", " : "") +
                (castId != null ? "castId=" + castId + ", " : "") +
                (crewId != null ? "crewId=" + crewId + ", " : "") +
                (tmdbImagesId != null ? "tmdbImagesId=" + tmdbImagesId + ", " : "") +
            "}";
    }

}
