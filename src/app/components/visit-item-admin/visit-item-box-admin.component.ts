import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {EmitterService} from "../../services/emitter.service";
import {VisitItemService} from "../../services/visit-item.service";
import {VisitItem} from "../../models/visit-item";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'visit-item-box',
  template: `
        <div>
          <button class="btn btn-xs btn-info" (click)="editVisitItem()"><span class="glyphicon glyphicon-edit"></span></button>
          <button class="btn btn-xs btn-danger" (click)="openModal()"><span class="glyphicon glyphicon-remove"></span></button>
          <span>{{visitItem.title_fr}}</span>  
        </div>
        
        <modal #modal>
            <modal-header [show-close]="true">
                <h4 class="modal-title">Confirmation</h4>
            </modal-header>
            <modal-body>
                Voulez-vous vraiment effacer '{{visitItem.title_fr}}'?
            </modal-body>
            <modal-footer>
                <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="modal.dismiss()">Cancel</button>
                <button type="button" class="btn btn-default" (click)="deleteVisitItem(visitItem.id)">Ok</button>
            </modal-footer>
        </modal>
    `
})
// Component class
export class VisitItemBoxAdminComponent {
  // Constructor
  constructor(
    private visitItemService: VisitItemService
  ){}
  // Define input properties
  @Input() visitItem: VisitItem;
  @Input() listId: string;
  @Input() editId:string;
  @Input() visitId:number;

  @ViewChild('modal')
  modal: ModalComponent;

  openModal() {
    this.modal.open();
  }

  editVisitItem(){
    // Emit edit event
    EmitterService.get(this.editId).emit(this.visitItem);
  }

  deleteVisitItem(id:string){
    this.modal.close();
    // Call removeComment() from CommentService to delete comment
    this.visitItemService.removeVisitItem(id).subscribe(
      visitItems => {
        // Emit list event
        EmitterService.get(this.listId).emit(visitItems);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }
}

