import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import {
  ActionTodosPersist,
  TODOS_KEY,
  TodosActionTypes
} from './todos.reducer';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions<Action>
    // private localStorageService: LocalStorageService
  ) { }

  @Effect({ dispatch: false })
  persistTodos(): Observable<Action> {
    return this.actions$
      .ofType(TodosActionTypes.PERSIST)
      .pipe(
        tap((action: ActionTodosPersist) =>
          localStorage.setItem(TODOS_KEY, JSON.stringify(action.payload.todos))
        )
      );
  }
}
