import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  //selector: 'comment-widget',
  selector: 'activity-item-admin',
  template: `
        <div class="row row-content row-content-activity">
          <div class="col-xs-12 col-sm-12">
            <activity-item-list [listId]="listId" [editId]="editId" [activityId]="activityId"></activity-item-list>
            <br/>
            <activity-item-form [listId]="listId" [editId]="editId" [activityId]="activityId"></activity-item-form>
            <br/>
            <button (click)="goBack()">Back</button>
          </div>
        </div>
    `,
  styleUrls: ['activity-item-admin.component.css']
})
export class ActivityItemAdminComponent implements OnInit {
  // Event tracking properties
  private listId = 'ACTIVITY_ITEM_COMPONENT_LIST';
  private editId = 'ACTIVITY_ITEM_COMPONENT_EDIT';
  private activityId;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityId = params["activityId"];
      console.log('ActivityItemAdminComponent ngOnInit activityId: ' + this.activityId);
    });
  }

  goBack(): void {
    this.location.back();
  }
}

