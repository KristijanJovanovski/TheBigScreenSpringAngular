import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocalStorageService } from './local-storage/local-storage.service';
import { debug } from './meta-reducers/debug.reducer';
import { environment } from '@env/environment';
import { AnimationsService } from './animations/animations.service';
import { authReducer, AuthEffects, AuthService, AuthGuardService, NotAuthGuardService, TokenInterceptor, ErrorInterceptor } from './auth';

// import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';


export const metaReducers: MetaReducer<any>[] = [
  // initStateFromLocalStorage
];

if (!environment.production) {
  metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    // ngrx
    StoreModule.forRoot(
      { auth: authReducer },
      { metaReducers }
    ),
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [],
  providers: [LocalStorageService, AnimationsService,
    AuthService,
    AuthGuardService,
    NotAuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})

export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
