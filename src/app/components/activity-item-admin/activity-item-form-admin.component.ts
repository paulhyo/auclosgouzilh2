import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../models/activity";
import {EmitterService} from "../../services/emitter.service";
import {ActivityItem} from "../../models/activity-item";
import {ActivityItemService} from "../../services/activity-item.service";

// Component decorator
@Component({
  selector: 'activity-item-form',
  template: `
        <form (ngSubmit)="submitActivityItem()">
            <div>
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
            </div>
            <div>
              <div class="col-sm-4">
                  <div class="form-group">
                      <textarea class="form-control" rows="4" placeholder="notes_fr" [(ngModel)]="model.notes_fr" name="notes_fr" required></textarea>
                  </div>
              </div>
              <div class="col-sm-4">
                  <div class="form-group">
                      <textarea class="form-control" rows="4" placeholder="notes_de" [(ngModel)]="model.notes_de" name="notes_de" required></textarea>
                  </div>
              </div>
              <div class="col-sm-4">
                  <div class="form-group">
                      <textarea class="form-control" rows="4" placeholder="notes_en" [(ngModel)]="model.notes_en" name="notes_en" required></textarea>
                  </div>
              </div>
            </div>
            <div>
                  <div class="form-group">
                      <input class="form-control" placeholder="link" [(ngModel)]="model.link" name="link"/>
                  </div>
            </div>
            <div>
                  <div class="form-group">
                      <input class="form-control" placeholder="source" [(ngModel)]="model.source" name="source"/>
                  </div>
             </div>
            <div *ngIf="!editing" class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Add</button>
            </div>
            <div *ngIf="editing" class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Update</button>
                <button type="submit" class="btn btn-warning btn-block" (click)="cancel()">Cancel</button>
            </div>
        </form>
    `,
})

export class ActivityItemFormAdminComponent implements OnChanges {
  // Constructor with injected service
  constructor(
    private activityItemService: ActivityItemService
  ){}
  // Local properties
  private model = new ActivityItem(null, null, '', '', '', '', '', '', null, null);
  private editing = false;

  // Input properties
  @Input() editId: string;
  @Input() listId: string;
  @Input() activityId: number;


  submitActivityItem(){
    // Variable to hold a reference of addComment/updateComment
    let activityItemOperation:Observable<ActivityItem[]>;

    this.model.activity_id = this.activityId;

    if(!this.editing){
      // Create a new comment
      activityItemOperation = this.activityItemService.addActivityItem(this.model)
    } else {
      // Update an existing comment
      activityItemOperation = this.activityItemService.updateActivityItem(this.model)
    }

    // Subscribe to observable
    activityItemOperation.subscribe(
      activityItems => {
        // Emit list event
        EmitterService.get(this.listId).emit(activityItems);
        // Empty model
        this.model = new ActivityItem(null, null, '', '', '', '', '', '', null, null);
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
    this.model = new ActivityItem(null, null, '', '', '', '', '', '', null, null);
    // Switch editing status
    if(this.editing) this.editing = !this.editing;
  }

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.editId).subscribe((activityItem:ActivityItem) => {
      this.model = activityItem;
      this.editing = true;
    });
  }
}

