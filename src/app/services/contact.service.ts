import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Logger} from "angular2-logger/core";
import {Configuration} from "../app.constants";
import {Observable} from "rxjs";
import {Image} from "../models/image";

@Injectable()
export class ContactService {

  private emailUrl: string;

  constructor(
    private http: Http,
    private _logger: Logger,
    private _configuration: Configuration) {
    //this.emailUrl = _configuration.RestServerUrl + 'email.php';
    this.emailUrl = '/php/email.php';
  }

  sendEmail (body): Observable<boolean> {
    //let bodyString = JSON.stringify(feedback); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.emailUrl, body, options) // ...using post request
      .map((response:Response) => {
        let message = response.json() && response.json().message;
        console.log("ContactService message: " + message);
        if (message) {
          return true;
        } else {
          return false;
        }
      })// ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

}
