import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MoviesFasade } from '../../fasade/movies.fasade';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'tbs-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss']
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  defaultImage = require('../../../../assets/Trakt-placeholder.png');
  defaultBackdropImage = require('../../../../assets/trakttv@2x.png');
  imageWidth = 185;
  movie$: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private moviesFasade: MoviesFasade
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.movie$ = this.moviesFasade.singleMovie$;
    this.moviesFasade.getMovieDetails(id);
  }
  ngOnDestroy() {
    this.moviesFasade.resetMovieDetails();
  }

}
