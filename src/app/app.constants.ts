import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public RestServerUrl: string = "http://localhost:8888/php/";
  public RestApiUrl: string = "api/";
  public RestServerWithApiUrl = this.RestServerUrl + this.RestApiUrl;
}
