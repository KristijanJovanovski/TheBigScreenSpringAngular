package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;
import mk.chris.thebigscreen.domain.enumeration.ImageType;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the TmdbImage entity. This class is used in TmdbImageResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /tmdb-images?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TmdbImageCriteria implements Serializable {
    /**
     * Class for filtering ImageType
     */
    public static class ImageTypeFilter extends Filter<ImageType> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private FloatFilter aspectRatio;

    private StringFilter filepath;

    private IntegerFilter height;

    private StringFilter iso6391;

    private IntegerFilter width;

    private ImageTypeFilter imageType;

    private LongFilter movieId;

    private LongFilter peopleId;

    public TmdbImageCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public FloatFilter getAspectRatio() {
        return aspectRatio;
    }

    public void setAspectRatio(FloatFilter aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    public StringFilter getFilepath() {
        return filepath;
    }

    public void setFilepath(StringFilter filepath) {
        this.filepath = filepath;
    }

    public IntegerFilter getHeight() {
        return height;
    }

    public void setHeight(IntegerFilter height) {
        this.height = height;
    }

    public StringFilter getIso6391() {
        return iso6391;
    }

    public void setIso6391(StringFilter iso6391) {
        this.iso6391 = iso6391;
    }

    public IntegerFilter getWidth() {
        return width;
    }

    public void setWidth(IntegerFilter width) {
        this.width = width;
    }

    public ImageTypeFilter getImageType() {
        return imageType;
    }

    public void setImageType(ImageTypeFilter imageType) {
        this.imageType = imageType;
    }

    public LongFilter getMovieId() {
        return movieId;
    }

    public void setMovieId(LongFilter movieId) {
        this.movieId = movieId;
    }

    public LongFilter getPeopleId() {
        return peopleId;
    }

    public void setPeopleId(LongFilter peopleId) {
        this.peopleId = peopleId;
    }

    @Override
    public String toString() {
        return "TmdbImageCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (aspectRatio != null ? "aspectRatio=" + aspectRatio + ", " : "") +
                (filepath != null ? "filepath=" + filepath + ", " : "") +
                (height != null ? "height=" + height + ", " : "") +
                (iso6391 != null ? "iso6391=" + iso6391 + ", " : "") +
                (width != null ? "width=" + width + ", " : "") +
                (imageType != null ? "imageType=" + imageType + ", " : "") +
                (movieId != null ? "movieId=" + movieId + ", " : "") +
                (peopleId != null ? "peopleId=" + peopleId + ", " : "") +
            "}";
    }

}
