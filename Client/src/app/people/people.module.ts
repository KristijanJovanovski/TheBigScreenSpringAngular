import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { PeopleRoutingModule } from './people-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    PeopleRoutingModule
  ], declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
})
export class PeopleModule { }
