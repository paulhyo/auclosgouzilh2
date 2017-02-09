import { Component, OnInit } from '@angular/core';
import { MediaImageModalComponent } from '../media-image-modal/media-image-modal.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  openModalWindow:boolean=false;
  imagePointer:number;
  imagesGouzilh = [
    { thumb: 'assets/img/chambre_gouzilh_1_mini.png', img: 'assets/img/chambre_gouzilh_1.png', description: 'Image 1' },
    { thumb: 'assets/img/chambre_gouzilh_2_mini.png', img: 'assets/img/chambre_gouzilh_2.png', description: 'Image 2' }
  ];
  imagesRigalleau = [
    { thumb: 'assets/img/chambre_rigalleau_1_mini.png', img: 'assets/img/chambre_rigalleau_1.png', description: 'Image 1' },
    { thumb: 'assets/img/chambre_rigalleau_2_mini.png', img: 'assets/img/chambre_rigalleau_2.png', description: 'Image 2' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
