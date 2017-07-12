import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { routing } from './app.routing';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { StandardPageComponent } from './components/shared/standard-page/standard-page.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthenticationService } from './services/authentication/authentication.service';

import { AuthGuard } from './guards/auth.guard';

import { HttpInterceptor } from './helpers/interceptors/http.interceptor';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HeaderComponent,
        ModalComponent,
        AlertComponent,
        StandardPageComponent,
        LoginComponent,
        HomeComponent
    ],
    imports: [
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        routing
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        HttpInterceptor
    ]
};
