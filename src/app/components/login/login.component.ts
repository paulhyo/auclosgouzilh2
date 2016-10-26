/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/


import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";

@Component({
  selector: 'login',
  template: `...`
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(email, password) {
    this.userService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }
}
