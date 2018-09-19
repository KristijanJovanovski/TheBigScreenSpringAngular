import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ActivatePageComponent } from './activate-page/activate-page.component';

export * from './landing-page/landing-page.component';
export * from './sign-in-page/sign-in-page.component';
export * from './sign-up-page/sign-up-page.component';
export * from './error-page/error-page.component';
export * from './activate-page/activate-page.component';

export const homeComponents = [
    LandingPageComponent, SignInPageComponent,
    SignUpPageComponent, ActivatePageComponent,
    ErrorPageComponent
];
