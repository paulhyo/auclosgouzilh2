import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Configuration} from "../app.constants";
import {Logger} from "angular2-logger/core";
import {Visit} from "../models/visit";
import {VisitDTO} from "../models/visitDto";
import {TranslateService} from "ng2-translate";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class VisitService {

  private visitUrl: string;
  private visitCrudUrl: string;
  public token: string;

  constructor(
    private http: Http,
    public authHttp: AuthHttp,
    private _logger: Logger,
    private _configuration: Configuration,
    private translate: TranslateService) {
    //this.visitUrl = _configuration.RestServerWithApiUrl + 'visit.php?lang=';
    //this.visitCrudUrl = _configuration.RestServerWithApiUrl + 'crud.php/visit';
    this.visitUrl = '/php/api/visit.php?lang=';
    this.visitCrudUrl = '/php/api/crud.php/visit';
  }

  getVisitAndItems() : Observable<VisitDTO[]>{
    return this.http.get(this.visitUrl + this.getLang())
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getVisits() : Observable<Visit[]>{
    return this.authHttp.get(this.visitCrudUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  addVisit (body: Object): Observable<Visit[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(this.visitCrudUrl, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateVisit (body: Object): Observable<Visit[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.put(`${this.visitCrudUrl}/${body['id']}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  removeVisit (id:string): Observable<Visit[]> {
    return this.authHttp.delete(`${this.visitCrudUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  private getLang(): string {
    return this.translate.currentLang;
  }
}
