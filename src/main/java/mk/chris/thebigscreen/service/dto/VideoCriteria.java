package mk.chris.thebigscreen.service.dto;

import java.io.Serializable;
import mk.chris.thebigscreen.domain.enumeration.VideoType;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Video entity. This class is used in VideoResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /videos?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class VideoCriteria implements Serializable {
    /**
     * Class for filtering VideoType
     */
    public static class VideoTypeFilter extends Filter<VideoType> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter videoKey;

    private StringFilter name;

    private StringFilter videoSite;

    private IntegerFilter videoSize;

    private VideoTypeFilter videoType;

    private LongFilter movieId;

    public VideoCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getVideoKey() {
        return videoKey;
    }

    public void setVideoKey(StringFilter videoKey) {
        this.videoKey = videoKey;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getVideoSite() {
        return videoSite;
    }

    public void setVideoSite(StringFilter videoSite) {
        this.videoSite = videoSite;
    }

    public IntegerFilter getVideoSize() {
        return videoSize;
    }

    public void setVideoSize(IntegerFilter videoSize) {
        this.videoSize = videoSize;
    }

    public VideoTypeFilter getVideoType() {
        return videoType;
    }

    public void setVideoType(VideoTypeFilter videoType) {
        this.videoType = videoType;
    }

    public LongFilter getMovieId() {
        return movieId;
    }

    public void setMovieId(LongFilter movieId) {
        this.movieId = movieId;
    }

    @Override
    public String toString() {
        return "VideoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (videoKey != null ? "videoKey=" + videoKey + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (videoSite != null ? "videoSite=" + videoSite + ", " : "") +
                (videoSize != null ? "videoSize=" + videoSize + ", " : "") +
                (videoType != null ? "videoType=" + videoType + ", " : "") +
                (movieId != null ? "movieId=" + movieId + ", " : "") +
            "}";
    }

}
