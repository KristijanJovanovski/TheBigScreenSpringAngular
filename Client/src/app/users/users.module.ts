import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SharedModule } from '../shared';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule
  ], declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
})
export class UsersModule { }
