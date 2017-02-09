import {Component, Input, ViewChild} from '@angular/core';
import {EmitterService} from "../../services/emitter.service";
import {Router} from "@angular/router";
import {VisitService} from "../../services/visit.service";
import {Visit} from "../../models/visit";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'visit-box',
  template: `
        <div class="visit-box">
          <button class="btn btn-xs btn-info" (click)="editVisit()"><span class="glyphicon glyphicon-edit"></span></button>
          <button class="btn btn-xs btn-success" (click)="editVisitItems(visit.id)"><span class="glyphicon glyphicon-list"></span></button>
          <!--<button class="btn btn-xs btn-danger" (click)="deleteVisit(visit.id)"><span class="glyphicon glyphicon-remove"></span></button>-->
          <button class="btn btn-xs btn-danger" (click)="openModal()"><span class="glyphicon glyphicon-remove"></span></button>
          <span>{{visit.title_fr}}</span>  
        </div>
        
        <modal #modal>
            <modal-header [show-close]="true">
                <h4 class="modal-title">Confirmation</h4>
            </modal-header>
            <modal-body>
                Voulez-vous vraiment effacer '{{visit.title_fr}}'?
            </modal-body>
            <modal-footer>
                <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="modal.dismiss()">Cancel</button>
                <button type="button" class="btn btn-default" (click)="deleteVisit(visit.id)">Ok</button>
            </modal-footer>
        </modal>
    `
})
// Component class
export class VisitBoxAdminComponent {
  // Constructor
  constructor(
    private visitService: VisitService,
    private router: Router
  ){}
  // Define input properties
  @Input() visit: Visit;
  @Input() listId: string;
  @Input() editId:string;

  @ViewChild('modal')
  modal: ModalComponent;

  openModal() {
    this.modal.open();
  }

  editVisit(){
    // Emit edit event
    EmitterService.get(this.editId).emit(this.visit);
  }

  deleteVisit(id:string){
    this.modal.close();
    // Call removeComment() from CommentService to delete comment
    this.visitService.removeVisit(id).subscribe(
      visits => {
        // Emit list event
        EmitterService.get(this.listId).emit(visits);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  editVisitItems(id: number): void {
    this.router.navigate(['/admin-visit-item', id]);
  }
}

