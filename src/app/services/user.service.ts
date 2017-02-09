import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  sendEmail(feedback): Observable<boolean> {
    let bodyString = JSON.stringify({ feedback });
    console.log("UserService sendEmail bodyString: " + bodyString);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    console.log("UserService feedback: " + feedback.lastName + " " + feedback.firstName);

    return this.http.post('/api/sendEmail', bodyString, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let message = response.json() && response.json().message;
        console.log("UserService message: " + message);
        //this._logger.info(token);
        if (message) {
          return true;
        } else {
          return false;
        }
      });
      //.catch((error:any) => Observable.throw(error.json()).error || 'Server error');
  }

  getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('/api/users', options)
      .map((response: Response) => response.json());
  }

}
