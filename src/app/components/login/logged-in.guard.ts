import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Logger } from "angular2-logger/core";
import { JwtHelper } from 'angular2-jwt';
import {AuthenticationService} from "../../services/authentication.service";


@Injectable()
export class LoggedInGuard implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _logger: Logger) {}

  canActivate() {
    if(this.authenticationService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
