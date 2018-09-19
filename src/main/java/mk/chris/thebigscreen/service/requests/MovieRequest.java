package mk.chris.thebigscreen.service.requests;

import mk.chris.thebigscreen.domain.enumeration.Status;

import java.time.LocalDate;

public class MovieRequest {

    private Long id;

    private String imdbId;

    private String backdropPath;

    private String posterPath;

    private String originalTitle;

    private String title;

    private String originalLanguage;

    private Float voteAverage;

    private Float popularity;

    private Long voteCount;

    private Long budget;

    private Integer runtime;

    private Long revenue;

    private LocalDate releaseDate;

    private String overview;

    private Status status;

}
