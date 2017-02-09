import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from "angular2-logger/core";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _logger: Logger) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/admin']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
