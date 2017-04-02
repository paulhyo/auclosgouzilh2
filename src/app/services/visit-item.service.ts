import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Logger} from "angular2-logger/core";
import {Configuration} from "../app.constants";
import {VisitItem} from "../models/visit-item";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class VisitItemService {

  private visitItemUrl: string;
  private visitItemCrudUrl: string;
  public token: string;

  constructor(
    private http: Http,
    public authHttp: AuthHttp,
    private _logger: Logger,
    private _configuration: Configuration) {
    //this.visitItemUrl = _configuration.RestServerWithApiUrl + 'visitItem.php';
    //this.visitItemCrudUrl = _configuration.RestServerWithApiUrl + 'crud.php/visit_item';
    this.visitItemUrl = '/php/api/visitItem.php';
    this.visitItemCrudUrl = '/php/api/crud.php/visit_item';
  }

  getVisitItemsByVisitId(visitId: number) : Observable<VisitItem[]>{
    return this.http.get(`${this.visitItemUrl}?visitId=${visitId}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  addVisitItem (body: Object): Observable<VisitItem[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(this.visitItemCrudUrl, body, options) // ...using post request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  updateVisitItem (body: Object): Observable<VisitItem[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.put(`${this.visitItemCrudUrl}/${body['id']}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  removeVisitItem (id:string): Observable<VisitItem[]> {
    return this.authHttp.delete(`${this.visitItemCrudUrl}/${id}`) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}

