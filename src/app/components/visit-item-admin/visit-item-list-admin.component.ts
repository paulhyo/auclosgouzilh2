import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {EmitterService} from "../../services/emitter.service";
import {VisitItem} from "../../models/visit-item";
import {VisitItemService} from "../../services/visit-item.service";

// Component decorator
@Component({
  selector: 'visit-item-list',
  template: `
        <visit-item-box [editId]="editId" [listId]="listId" [visitId]="visitId" *ngFor="let visitItem of visitItems" [visitItem]="visitItem"></visit-item-box>
    `,

})
// Component class
export class VisitItemListAdminComponent implements OnInit, OnChanges{
  // Constructor with injected service
  constructor(
    private visitItemService: VisitItemService
  ){}
  // Local properties
  visitItems: VisitItem[];
  // Input properties
  @Input() listId: string;
  @Input() editId: string;
  @Input() visitId: number;

  loadVisitItems(){
    console.log('loadVisitItems');
    this.visitItemService.getVisitItemsByVisitId(this.visitId)
      .subscribe(
        visitItems => this.visitItems = visitItems, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  ngOnInit(){
    this.loadVisitItems();
  }


  ngOnChanges(changes:any) {
    // Listen to the 'list'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((visitItems:VisitItem[]) => {
      //this.visitItems = visitItems
      this.loadVisitItems();
    });
  }

}
