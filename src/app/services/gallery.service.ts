import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Logger} from "angular2-logger/core";
import {Configuration} from "../app.constants";
import {Observable} from "rxjs";
import {Image} from "../models/image";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class GalleryService {

  private listImageUrl: string;
  private removeImageUrl: string;
  public token: string;

  constructor(
    private http: Http,
    public authHttp: AuthHttp,
    private _logger: Logger,
    private _configuration: Configuration) {
    //this.listImageUrl = _configuration.RestServerUrl + 'list_images.php';
    //this.removeImageUrl = _configuration.RestServerUrl + 'remove_image.php';
    this.listImageUrl = '/php/list_images.php';
    this.removeImageUrl = '/php/remove_image.php';
  }

  listImages() : Observable<Image[]>{
    return this.http.get(this.listImageUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  removeImage (body: Object): Observable<Image[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(this.removeImageUrl, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

}
