import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Activity} from "../models/activity";
import {Logger} from "angular2-logger/core";
import {Configuration} from "../app.constants";
import {TranslateService} from "ng2-translate";
import {ActivityDTO} from "../models/activityDto";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ActivityService {

  private activityUrl: string;
  private activityCrudUrl: string;
  public token: string;

  constructor(
    private http: Http,
    public authHttp: AuthHttp,
    private _logger: Logger,
    private _configuration: Configuration,
    private translate: TranslateService) {
    //this.activityUrl = _configuration.RestServerWithApiUrl + 'activity.php?lang=';
    //this.activityCrudUrl = _configuration.RestServerWithApiUrl + 'crud.php/activity';
    this.activityUrl = '/php/api/activity.php?lang=';
    this.activityCrudUrl = '/php/api/crud.php/activity';
  }

  getActivityAndItems() : Observable<ActivityDTO[]>{
    return this.http.get(this.activityUrl + this.getLang())
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getActivities() : Observable<Activity[]>{
    return this.authHttp.get(this.activityCrudUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  addActivity (body: Object): Observable<Activity[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(this.activityCrudUrl, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateActivity (body: Object): Observable<Activity[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.put(`${this.activityCrudUrl}/${body['id']}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  removeActivity (id:string): Observable<Activity[]> {
    return this.authHttp.delete(`${this.activityCrudUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  private getLang(): string {
    return this.translate.currentLang;
  }
}

