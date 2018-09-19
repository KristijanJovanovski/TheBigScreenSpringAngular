import { MoviePageComponent } from './movie-page/movie-page.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { MovieTileComponent } from './movie-tile/movie-tile.component';
import { MovieListComponent } from './movie-list/movie-list.component';


export * from './movie-list/movie-list.component';
export * from './movie-page/movie-page.component';
export * from './movie-details-page/movie-details-page.component';
export * from './movie-tile/movie-tile.component';

export const components: any[] = [MovieListComponent, MoviePageComponent, MovieDetailsPageComponent, MovieTileComponent];