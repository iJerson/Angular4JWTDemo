
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html' 
})
export class LoginComponent implements OnInit {

    model: any = {};
    loginFailed = false;
    loading = false;
    returnUrl: string;
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.loading = false;
                this.loginFailed = true;
                this.errorMessage = error;                
            });
    }

    closeAlert(): void {
        console.log('closed');
    }
}
