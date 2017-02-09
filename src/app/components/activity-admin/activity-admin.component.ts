import { Component} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  //selector: 'comment-widget',
  selector: 'activity-admin',
  template: `
        <div class="row row-content row-content-activity">
          <div class="col-xs-12 col-sm-12">
            <h4>Activités</h4>
            <activity-list [listId]="listId" [editId]="editId"></activity-list>
            <br/>
            <activity-form [listId]="listId" [editId]="editId"></activity-form>
            <br/>
            <button (click)="goBack()">Back</button>
          </div>
        </div>
    `,
  styleUrls: ['./activity-admin.component.css']
})
export class ActivityAdminComponent {
  // Event tracking properties
  private listId = 'ACTIVITY_COMPONENT_LIST';
  private editId = 'ACTIVITY_COMPONENT_EDIT';

  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }
}

