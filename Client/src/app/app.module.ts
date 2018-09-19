
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeComponents } from './home';
// import { AuthService, AuthGuardService } from './core';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor, ErrorInterceptor } from './core/auth/token.interceptor';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    SettingsModule,

    // app
    AppRoutingModule,
  ],
  declarations: [AppComponent, ...homeComponents],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
