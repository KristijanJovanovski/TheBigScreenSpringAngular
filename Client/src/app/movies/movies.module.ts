import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { services } from './services';
import { components } from './components';
import { MoviesFasade } from './fasade/movies.fasade';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MoviesRoutingModule,
    StoreModule.forFeature('movies', reducers),
    EffectsModule.forFeature(effects),

    LazyLoadImageModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  providers: [...services, MoviesFasade]
})
export class MoviesModule { }
