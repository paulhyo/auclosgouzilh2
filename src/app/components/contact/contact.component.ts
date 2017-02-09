import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Feedback } from '../../models/feedback';
import { TranslateService } from 'ng2-translate';
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  //styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  submitted = false;
  feedback = new Feedback('', '', '', '');
  //active = true;
  displayMessage = false;
  error = '';

  constructor(
    private translate: TranslateService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

  sendEmail(form: FormGroup) {
    this.submitted = true;
    //this.active = false;
    this.contactService.sendEmail(this.feedback)
      .subscribe(result => {
        if (result === true) {
          this.displayMessage = true;
          setTimeout(() => {
            this.displayMessage = false;
            form.reset();
            this.feedback = new Feedback('', '', '', '');
          }, 3000);
        } else {
          this.error = 'Send Email failed';
        }
      });
  }

}
