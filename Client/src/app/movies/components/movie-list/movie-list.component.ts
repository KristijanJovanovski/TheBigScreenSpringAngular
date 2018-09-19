import { Component, OnInit, HostListener, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MoviesFasade } from '../../fasade/movies.fasade';
import { Movie } from '../../models/movie.model';




@Component({
  selector: 'tbs-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  defaultImage = require('../../../../assets/Trakt-placeholder.png');
  imageWidth = 185;
  imageHeight = 278;
  aspectRatio;
  cols;
  routeSubscription: Subscription;
  category: String;
  postingId: number;


  movies$: Observable<Movie[]>;
  fetching$: Observable<boolean>;
  posting$: Observable<boolean>;
  page = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesFasade: MoviesFasade
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe(data => {
      this.category = data.category;
      this.getMovies(data.category);
    });
    this.aspectRatio = `${this.imageWidth}:${this.imageHeight}`;
    const width = window.innerWidth;
    this.updateCols(width);
    this.getMoreMovies();
  }

  ngOnDestroy(): void {
    switch (this.category) {
      case 'popular':
        this.moviesFasade.resetPupularSubjectLastValue();
        break;
      case 'top-rated':
        this.moviesFasade.resetTopRatedSubjectLastValue();
        break;
      case 'bookmarked':
        this.moviesFasade.resetBookmarkedSubjectLastValue();
        break;
      case 'watched':
        this.moviesFasade.resetWatchedSubjectLastValue();
        break;
      case 'rated':
        this.moviesFasade.resetRatedSubjectLastValue();
        break;
      default:
        break;
    }
    if (this.routeSubscription) { this.routeSubscription.unsubscribe(); }
  }

  onScroll(event) {
    this.getMoreMovies();
    console.log(`event: ${event}`);
  }

  getMovies(category: string) {
    switch (category) {
      case 'popular':
        this.movies$ = this.moviesFasade.popularMovies$;
        this.fetching$ = this.moviesFasade.popularMoviesFetching$;
        break;
      case 'top-rated':
        this.movies$ = this.moviesFasade.topRatedMovies$;
        this.fetching$ = this.moviesFasade.topRatedMoviesFetching$;
        break;
      case 'bookmarked':
        this.movies$ = this.moviesFasade.bookmarkedMovies$;
        this.fetching$ = this.moviesFasade.bookmarkedMoviesFetching$;
        break;
      case 'watched':
        this.movies$ = this.moviesFasade.watchedMovies$;
        this.fetching$ = this.moviesFasade.watchedMoviesFetching$;
        break;
      case 'rated':
        this.movies$ = this.moviesFasade.ratedMovies$;
        this.fetching$ = this.moviesFasade.ratedMoviesFetching$;
        break;
      default:
        break;
    }
    this.posting$ = this.moviesFasade.posting$;
  }

  getMoreMovies() {
    switch (this.category) {
      case 'popular':
        this.moviesFasade.getPopularNextPage(this.page++);
        break;
      case 'top-rated':
        this.moviesFasade.getTopRatedNextPage(this.page++);
        break;
      case 'bookmarked':
        this.moviesFasade.getBookmarkedNextPage(this.page++);
        break;
      case 'watched':
        this.moviesFasade.getWatchedNextPage(this.page++);
        break;
      case 'rated':
        this.moviesFasade.getRatedNextPage(this.page++);
        break;
      default:
        break;
    }
  }


  bookmarkMovie(movie: Movie, event) {
    if (movie.bookmarkedOn) {
      this.moviesFasade.unbookmarkMovie(movie);
    } else {
      this.moviesFasade.bookmarkMovie(movie);
    }
    this.postingId = movie.id;
  }

  watchMovie(movie: Movie, event) {
    if (movie.watchedOn) {
      this.moviesFasade.unwatchMovie(movie);
    } else {
      this.moviesFasade.watchMovie(movie);
    }
    this.postingId = movie.id;
  }

  rateMovie(movie: Movie, event) {
    if (movie.ratedOn) {
      this.moviesFasade.unrateMovie(movie);
    } else {
      const rate = Math.round(Math.random() * 10);
      this.moviesFasade.rateMovie(movie, rate);
    }
    this.postingId = movie.id;
  }

  getDetails(movie: Movie, event) {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     'data': movie
    //   }
    // };
    this.router.navigate(['movies/', movie.id]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;
    console.log(width);
    this.updateCols(width);
  }

  updateCols(width) {
    if (width <= 576) {
      this.cols = 2;
    } else if (width < 768) {
      this.cols = 3;
    } else if (width < 992) {
      this.cols = 5;
    } else {
      this.cols = 7;
    }
  }


}
