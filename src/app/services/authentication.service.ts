import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Logger } from 'angular2-logger/core';
import { Configuration } from '../app.constants';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  private actionUrl: string;
  public token: string;

  constructor(
    private http: Http,
    private _logger: Logger,
    private _configuration: Configuration) {
      //this.actionUrl = _configuration.RestServerWithApiUrl + 'authenticate.php';
      this.actionUrl = '/php/api/authenticate.php';
  }

  loggedIn() {
    return tokenNotExpired();
  }

  login(username, password): Observable<boolean> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    console.log("AuthenticationService login body: " + body);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(this.actionUrl, body.toString(), options)
      .map((response: Response) => {
        //this._logger.info(response.json());
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        //this._logger.info(token);
        if (token) {
          // store jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('id_token', token );

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('id_token');
  }

}
