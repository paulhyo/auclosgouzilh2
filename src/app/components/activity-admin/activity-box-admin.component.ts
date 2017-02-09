import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {EmitterService} from "../../services/emitter.service";
import {Activity} from "../../models/activity";
import {Router} from "@angular/router";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'activity-box',
  template: `
        <div class="activity-box">
          <button class="btn btn-xs btn-info" (click)="editActivity()"><span class="glyphicon glyphicon-edit"></span></button>
          <button class="btn btn-xs btn-success" (click)="editActivityItems(activity.id)"><span class="glyphicon glyphicon-list"></span></button>
          <button class="btn btn-xs btn-danger" (click)="openModal()"><span class="glyphicon glyphicon-remove"></span></button>
          <span>{{activity.title_fr}}</span>  
        </div>
        
        <modal #modal>
            <modal-header [show-close]="true">
                <h4 class="modal-title">Confirmation</h4>
            </modal-header>
            <modal-body>
                Voulez-vous vraiment effacer '{{activity.title_fr}}'?
            </modal-body>
            <modal-footer>
                <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="modal.dismiss()">Cancel</button>
                <button type="button" class="btn btn-default" (click)="deleteActivity(activity.id)">Ok</button>
            </modal-footer>
        </modal>
    `
})
// Component class
export class ActivityBoxAdminComponent {
  // Constructor
  constructor(
    private activityService: ActivityService,
    private router: Router
  ){}
  // Define input properties
  @Input() activity: Activity;
  @Input() listId: string;
  @Input() editId:string;

  @ViewChild('modal')
  modal: ModalComponent;

  openModal() {
    this.modal.open();
  }

  editActivity(){
    // Emit edit event
    EmitterService.get(this.editId).emit(this.activity);
  }

  deleteActivity(id:string){
    this.modal.close();
    // Call removeComment() from CommentService to delete comment
    this.activityService.removeActivity(id).subscribe(
      activities => {
        // Emit list event
        EmitterService.get(this.listId).emit(activities);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  editActivityItems(id: number): void {
    this.router.navigate(['/admin-activity-item', id]);
  }
}

