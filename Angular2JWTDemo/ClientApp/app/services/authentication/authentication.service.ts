
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { HttpInterceptor } from '../../helpers/interceptors/http.interceptor';

@Injectable()
export class AuthenticationService {
    headers: Headers;
    constructor(private http: HttpInterceptor, @Inject('ORIGIN_URL') private originUrl: string) { }

    login(username: string, password: string) {

        let body: any = "grant_type=password&username=" + username + "&password=" + password;
        let url = "http://localhost:40083/oauth2/token";
        let response: any;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
  
        return this.http.post(url, body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }); 
    }

    logout(): void {
        console.log('logout');
        localStorage.removeItem('currentUser');
    }

}
