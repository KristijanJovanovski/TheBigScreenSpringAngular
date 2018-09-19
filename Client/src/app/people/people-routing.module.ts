import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeoplePageComponent, PeopleListComponent, PeopleDetailsPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: PeoplePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'actors',
        pathMatch: 'full'
      },
      {
        path: 'actors',
        component: PeopleListComponent,
        data: {
          category: 'actors'
        }
      },
      {
        path: 'directors',
        component: PeopleListComponent,
        data: {
          category: 'directors'
        }
      }
    ]
  },
  {
    path: ':id',
    component: PeopleDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
