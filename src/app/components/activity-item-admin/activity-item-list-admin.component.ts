import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity.service";
import {EmitterService} from "../../services/emitter.service";
import {ActivityItem} from "../../models/activity-item";
import {ActivityItemService} from "../../services/activity-item.service";

// Component decorator
@Component({
  selector: 'activity-item-list',
  template: `
        <activity-item-box [editId]="editId" [listId]="listId" [activityId]="activityId" *ngFor="let activityItem of activityItems" [activityItem]="activityItem"></activity-item-box>
    `,

})
// Component class
export class ActivityItemListAdminComponent implements OnInit, OnChanges{
  // Constructor with injected service
  constructor(
    private activityItemService: ActivityItemService
  ){}
  // Local properties
  activityItems: ActivityItem[];
  // Input properties
  @Input() listId: string;
  @Input() editId: string;
  @Input() activityId: number;

  loadActivityItems(){
    console.log('loadActivityItems');
    this.activityItemService.getActivityItemsByActivityId(this.activityId)
      .subscribe(
        activityItems => this.activityItems = activityItems, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  ngOnInit(){
    this.loadActivityItems();
  }


  ngOnChanges(changes:any) {
    // Listen to the 'list'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((activityItems:ActivityItem[]) => {
      //this.activityItems = activityItems
      this.loadActivityItems();
    });
  }

}
