import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../models/activity";
import {EmitterService} from "../../services/emitter.service";

// Component decorator
@Component({
  selector: 'activity-form',
  template: `
        <form (ngSubmit)="submitActivity()">
            <div class="col-sm-4">
                <div class="form-group">
                    <input class="form-control" placeholder="title_fr" [(ngModel)]="model.title_fr" name="title_fr" required/>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <input class="form-control" placeholder="title_de" [(ngModel)]="model.title_de" name="title_de" required/>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <input class="form-control" placeholder="title_en" [(ngModel)]="model.title_en" name="title_en" required />
                </div>
            </div>
            <div *ngIf="!editing" class="form-group col-sm-12">
                <button type="submit" class="btn btn-primary btn-block">Add</button>
            </div>
            <div *ngIf="editing" class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Update</button>
                <button type="submit" class="btn btn-warning btn-block" (click)="cancel()">Cancel</button>
            </div>
        </form>
    `,
})

export class ActivityFormAdminComponent implements OnChanges {
  // Constructor with injected service
  constructor(
    private activityService: ActivityService
  ){}
  // Local properties
  private model = new Activity(null, '', '', '');
  private editing = false;

  // Input properties
  @Input() editId: string;
  @Input() listId: string;


  submitActivity(){
    // Variable to hold a reference of addComment/updateComment
    let activityOperation:Observable<Activity[]>;

    if(!this.editing){
      // Create a new comment
      activityOperation = this.activityService.addActivity(this.model)
    } else {
      // Update an existing comment
      activityOperation = this.activityService.updateActivity(this.model)
    }

    // Subscribe to observable
    activityOperation.subscribe(
      activities => {
        // Emit list event
        EmitterService.get(this.listId).emit(activities);
        // Empty model
        this.model = new Activity(null, '', '', '');
        // Switch editing status
        if(this.editing) this.editing = !this.editing;
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  cancel() {
    // Empty model
    this.model = new Activity(null, '', '', '');
    // Switch editing status
    if(this.editing) this.editing = !this.editing;
  }

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.editId).subscribe((activity:Activity) => {
      this.model = activity
      this.editing = true;
    });
  }
}

