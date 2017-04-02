import { Component, OnInit } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private _logger: Logger
  ){ }

  ngOnInit() {
  }

}
