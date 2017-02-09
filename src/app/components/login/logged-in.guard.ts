import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Logger } from "angular2-logger/core";


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private _logger: Logger) {}

  canActivate() {
    this._logger.info('Enter canActivate');
    if (localStorage.getItem('currentUser')) {
      this._logger.info('user is logged in');
      // logged in so return true
      return true;
    }

    this._logger.info('user is NOT logged in');
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
