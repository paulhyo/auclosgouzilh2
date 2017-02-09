import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity.service";
import {EmitterService} from "../../services/emitter.service";

// Component decorator
@Component({
  selector: 'activity-list',
  template: `
        <activity-box [editId]="editId" [listId]="listId" *ngFor="let activity of activities" [activity]="activity"></activity-box>
    `,

})
// Component class
export class ActivityListAdminComponent implements OnInit, OnChanges{
  // Constructor with injected service
  constructor(
    private activityService: ActivityService
  ){}
  // Local properties
  activities: Activity[];
  // Input properties
  @Input() listId: string;
  @Input() editId: string;

  loadActivities(){
    console.log('loadActivities');
    // Get all comments
    this.activityService.getActivities()
      .subscribe(
        activities => this.activities = activities, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  ngOnInit(){
    this.loadActivities()
  }


  ngOnChanges(changes:any) {
    // Listen to the 'list'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((activities:Activity[]) => {this.activities = activities});
  }

}
