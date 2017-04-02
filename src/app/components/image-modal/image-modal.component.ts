import {Component, Input,Output,ElementRef,EventEmitter,OnInit} from '@angular/core';
import {Image} from "../../models/image";

@Component({
  selector: 'image-modal',
  template: `
   <div class="ng-gallery" *ngIf="showRepeat">
     <div *ngFor ="let i of modalImages; let index = index">
       <img src="{{ i.thumb }}" class="ng-thumb" (click)="openGallery(index)" alt="Image {{ index + 1 }}" />
     </div>
   </div>
   <div class="ng-overlay" *ngIf="opened">
    <div class="ng-gallery-content" >
    <div class="uil-ring-css" *ngIf="loading"><div></div></div>
     <a *ngIf="deleteButton" class="remove" (click)="deleteImage()"><i class="fa fa-trash-o fa-fw"></i></a>
     <a class="close-popup" (click)="closeGallery()"><i class="fa fa-close"></i></a>
     <a class="nav-left" *ngIf="modalImages.length >1" (click)="prevImage()"><i class="fa fa-angle-left"></i></a>
     <img *ngIf="!loading" src="{{imgSrc}}" (click)="nextImage()" class="effect" />
     <a class="nav-right" *ngIf="modalImages.length >1" (click)="nextImage()"><i class="fa fa-angle-right"></i></a>
     <span class="info-text">{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span>
   </div>
   </div>
       `,
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  public _element:any;
  public opened:boolean = false;
  public imgSrc:string;
  public currentImageIndex:number;
  public loading:boolean= false;
  public showRepeat:boolean= false;
  @Input('thumbGallery') public thumbGallery:boolean;
  @Input('thumbRooms') public thumbRooms:boolean;
  @Input('modalImages') public modalImages:any;
  @Input('imagePointer') public imagePointer:number;
  @Input('deleteButton') public deleteButton:boolean;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();
  @Output('deleteEvent') deleteEvent = new EventEmitter<Image>();
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
    this.loading = true;
    if(this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if(this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length-1  ;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if(this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index) {
    if(!index) {
      this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
    this.opened = true;
    for (var i = 0; i < this.modalImages.length; i++) {
      if (i === this.currentImageIndex ) {
        this.imgSrc = this.modalImages[i].img;
        this.loading = false;
        break;
      }
    }
  }

  deleteImage() {
    this.closeGallery();
    this.deleteEvent.emit(this.modalImages[this.currentImageIndex]);
  }
}
