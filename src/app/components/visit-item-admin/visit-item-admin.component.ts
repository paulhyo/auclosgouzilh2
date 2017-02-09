import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  //selector: 'comment-widget',
  selector: 'visit-item-admin',
  template: `
        <div class="row row-content row-content-visit">
          <div class="col-xs-12 col-sm-12">
            <visit-item-list [listId]="listId" [editId]="editId" [visitId]="visitId"></visit-item-list>
            <br/>
            <visit-item-form [listId]="listId" [editId]="editId" [visitId]="visitId"></visit-item-form>
            <br/>
            <button (click)="goBack()">Back</button>
          </div>
        </div>
    `,
  styleUrls: ['visit-item-admin.component.css']
})
export class VisitItemAdminComponent implements OnInit {
  // Event tracking properties
  private listId = 'VISIT_ITEM_COMPONENT_LIST';
  private editId = 'VISIT_ITEM_COMPONENT_EDIT';
  private visitId;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.visitId = params["visitId"];
      console.log('VisitItemAdminComponent ngOnInit visitId: ' + this.visitId);
    });
  }

  goBack(): void {
    this.location.back();
  }
}

