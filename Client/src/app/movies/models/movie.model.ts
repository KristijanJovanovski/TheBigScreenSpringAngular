export interface Movie {
    id: number;
    title: string;
    imdbId?: string;
    backdropPath?: string;
    posterPath?: string;
    originalTitle?: string;
    originalLanguage?: string;
    voteAverage?: number;
    popularity: number;
    voteCount?: number;
    budget?: number;
    runtime?: number;
    revenue?: number;
    releaseDate?: string; // change to date ;
    overview?: string;
    status?: string;
    genres?: Genre[];
    bookmarkedOn?: string;
    watchedOn?: string;
    ratedOn?: string;
    rate?: number;
    cast?: any[];
    crew?: any[];
    tmdbImages?: any[];
    videos?: any[];
}

export interface Genre {
    id: number;
    name: string;
}
