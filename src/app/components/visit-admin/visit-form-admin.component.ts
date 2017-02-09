import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {VisitService} from "../../services/visit.service";
import {Visit} from "../../models/visit";
import {EmitterService} from "../../services/emitter.service";

// Component decorator
@Component({
  selector: 'visit-form',
  template: `
        <form (ngSubmit)="submitVisit()">
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

export class VisitFormAdminComponent implements OnChanges {
  // Constructor with injected service
  constructor(
    private visitService: VisitService
  ){}
  // Local properties
  private model = new Visit(null, '', '', '');
  private editing = false;

  // Input properties
  @Input() editId: string;
  @Input() listId: string;


  submitVisit(){
    // Variable to hold a reference of addComment/updateComment
    let visitOperation:Observable<Visit[]>;

    if(!this.editing){
      // Create a new comment
      visitOperation = this.visitService.addVisit(this.model)
    } else {
      // Update an existing comment
      visitOperation = this.visitService.updateVisit(this.model)
    }

    // Subscribe to observable
    visitOperation.subscribe(
      activities => {
        // Emit list event
        EmitterService.get(this.listId).emit(activities);
        // Empty model
        this.model = new Visit(null, '', '', '');
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
    this.model = new Visit(null, '', '', '');
    // Switch editing status
    if(this.editing) this.editing = !this.editing;
  }

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.editId).subscribe((visit:Visit) => {
      this.model = visit
      this.editing = true;
    });
  }
}

