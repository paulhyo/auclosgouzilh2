import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {EmitterService} from "../../services/emitter.service";
import {ActivityItemService} from "../../services/activity-item.service";
import {ActivityItem} from "../../models/activity-item";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'activity-item-box',
  template: `
        <div>
          <button class="btn btn-xs btn-info" (click)="editActivityItem()"><span class="glyphicon glyphicon-edit"></span></button>
          <button class="btn btn-xs btn-danger" (click)="openModal()"><span class="glyphicon glyphicon-remove"></span></button>
          <span>{{activityItem.title_fr}}</span>  
        </div>
        
        <modal #modal>
            <modal-header [show-close]="true">
                <h4 class="modal-title">Confirmation</h4>
            </modal-header>
            <modal-body>
                Voulez-vous vraiment effacer '{{activityItem.title_fr}}'?
            </modal-body>
            <modal-footer>
                <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="modal.dismiss()">Cancel</button>
                <button type="button" class="btn btn-default" (click)="deleteActivityItem(activityItem.id)">Ok</button>
            </modal-footer>
        </modal>
    `
})
// Component class
export class ActivityItemBoxAdminComponent {
  // Constructor
  constructor(
    private activityItemService: ActivityItemService
  ){}
  // Define input properties
  @Input() activityItem: ActivityItem;
  @Input() listId: string;
  @Input() editId:string;
  @Input() activityId:number;

  @ViewChild('modal')
  modal: ModalComponent;

  openModal() {
    this.modal.open();
  }

  editActivityItem(){
    // Emit edit event
    EmitterService.get(this.editId).emit(this.activityItem);
  }

  deleteActivityItem(id:string){
    this.modal.close();
    // Call removeComment() from CommentService to delete comment
    this.activityItemService.removeActivityItem(id).subscribe(
      activityItems => {
        // Emit list event
        EmitterService.get(this.listId).emit(activityItems);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }
}

