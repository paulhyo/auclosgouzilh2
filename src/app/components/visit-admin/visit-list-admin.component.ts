import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {EmitterService} from "../../services/emitter.service";
import {VisitService} from "../../services/visit.service";
import {Visit} from "../../models/visit";

// Component decorator
@Component({
  selector: 'visit-list',
  template: `
        <visit-box [editId]="editId" [listId]="listId" *ngFor="let visit of visits" [visit]="visit"></visit-box>
    `,

})
// Component class
export class VisitListAdminComponent implements OnInit, OnChanges{
  // Constructor with injected service
  constructor(
    private visitService: VisitService
  ){}
  // Local properties
  visits: Visit[];
  // Input properties
  @Input() listId: string;
  @Input() editId: string;

  loadVisits(){
    console.log('loadActivities');
    // Get all comments
    this.visitService.getVisits()
      .subscribe(
        visits => this.visits = visits, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  ngOnInit(){
    this.loadVisits()
  }


  ngOnChanges(changes:any) {
    // Listen to the 'list'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((visits:Visit[]) => {this.visits = visits});
  }

}
