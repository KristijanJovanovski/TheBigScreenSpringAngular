import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MoviesState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { Page } from '../models/page.model';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../constants';
import { User } from '../../core/auth/user.model';

@Injectable()
export class MoviesService {
  endpointMovieDetails = (id) => `${SERVER_API_URL}movies/${id}?append_to_response=cast%2Ccrew%2Cimages%2Cvideos`;

  endpointPopular = (pageNumber) => `${SERVER_API_URL}movies?page=${pageNumber}`; // &sort=popularity%2Cdesc`;

  endpointTopRated = (pageNumber) => `${SERVER_API_URL}movies?page=${pageNumber}`; // &sort=voteAverage%2Cdesc`;

  endpointBookmarkedPaged = (login, pageNumber) => `${this.endpointBookmarked(login)}?page=${pageNumber}`;

  endpointWatchedPaged = (login, pageNumber) => `${this.endpointWatched(login)}?page=${pageNumber}`;

  endpointRatedPaged = (login, pageNumber) => `${this.endpointRated(login)}?page=${pageNumber}`;

  endpointBookmarked = (login) =>
    `${SERVER_API_URL}users/${login}/bookmarked-movies`

  endpointWatched = (login) =>
    `${SERVER_API_URL}users/${login}/watched-movies`

  endpointRated = (login) =>
    `${SERVER_API_URL}users/${login}/rated-movies`

  constructor(private http: HttpClient) { }

  fetchMovieDetails(id: number): Observable<Movie> {
    const url = this.endpointMovieDetails(id);
    return this.http.get(url).pipe(
      map((response: Movie) => {
        const movie = { ...response } as Movie;
        return movie;
      })
    );
  }

  fetchPopularMovies(pageNumber: number): Observable<Page<Movie>> {
    const url = this.endpointPopular(pageNumber + 1);
    return this.fetchMovies(url, pageNumber);
  }

  fetchTopRatedMovies(pageNumber: number): Observable<Page<Movie>> {
    const url = this.endpointTopRated(pageNumber + 1);
    return this.fetchMovies(url, pageNumber);
  }

  fetchBookmarkedMovies(user: User, pageNumber: number): Observable<Page<Movie>> {
    const url = this.endpointBookmarkedPaged(user.login, pageNumber + 1);
    return this.fetchMovies(url, pageNumber);
  }

  fetchWatchedMovies(user: User, pageNumber: number): Observable<Page<Movie>> {
    const url = this.endpointWatchedPaged(user.login, pageNumber + 1);
    return this.fetchMovies(url, pageNumber);
  }

  fetchRatedMovies(user: User, pageNumber: number): Observable<Page<Movie>> {
    const url = this.endpointRatedPaged(user.login, pageNumber + 1);
    return this.fetchMovies(url, pageNumber);
  }

  bookmarkMovie(movie: Movie, user: User): Observable<Movie> {
    const payload = {
      createdOn: movie.bookmarkedOn !== undefined ? movie.bookmarkedOn : new Date().toISOString(),
      movieId: movie.id
    };
    return this.http.post<Movie>(this.endpointBookmarked(user.login), payload);
  }

  unBookmarkMovie(movie: Movie, user: User): Observable<Movie> {
    return this.http.delete(`${this.endpointBookmarked(user.login)}/${movie.id}`).pipe(
      map(() => movie)
    );
  }

  watchMovie(movie: Movie, user: User): Observable<Movie> {
    const payload = {
      createdOn: movie.watchedOn !== undefined ? movie.watchedOn : new Date().toISOString(),
      movieId: movie.id
    };
    return this.http.post<Movie>(this.endpointWatched(user.login), payload);
  }

  unWatchMovie(movie: Movie, user: User): Observable<Movie> {
    return this.http.delete(`${this.endpointWatched(user.login)}/${movie.id}`).pipe(
      map(() => movie)
    );
  }


  rateMovie(movie: Movie, user: User, rate: number): Observable<Movie> {
    const payload = {
      createdOn: movie.ratedOn !== undefined ? movie.ratedOn : new Date().toISOString(),
      rate: rate,
      movieId: movie.id
    };
    return this.http.post<Movie>(this.endpointRated(user.login), payload);
  }

  unRateMovie(movie: Movie, user: User): Observable<Movie> {
    return this.http.delete(`${this.endpointRated(user.login)}/${movie.id}`).pipe(
      map(() => movie)
    );
  }

  private fetchMovies(url: string, pageNumber: number) {
    return this.http.get(url)
      .pipe(
        map((response: HttpResponse<Movie[]>) => {
          const body = [...response['content']].reduce((acc, curr) => ([{ ...curr } as Movie, ...acc]), [] as Movie[]);
          const page = {
            current: pageNumber + 1,
            total: +response['totalPages'],
            hasNext: !response['last'],
            data: body
          } as Page<Movie>;
          return page;
        })
      );
  }

}
