import { Component} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'visit-admin',
  template: `
        <div class="row row-content row-content-visit">
          <div class="col-xs-12 col-sm-12">
            <h4>Visites</h4>
            <visit-list [listId]="listId" [editId]="editId"></visit-list>
            <br/>
            <visit-form [listId]="listId" [editId]="editId"></visit-form>
            <br/>
            <button (click)="goBack()">Back</button>
          </div>
        </div>
    `,
  styleUrls: ['./visit-admin.component.css']
})
export class VisitAdminComponent {
  // Event tracking properties
  private listId = 'VISIT_COMPONENT_LIST';
  private editId = 'VISIT_COMPONENT_EDIT';

  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }
}
