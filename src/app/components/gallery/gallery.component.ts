import { Component, OnInit } from '@angular/core';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import {Http} from "@angular/http";
import {GalleryService} from "../../services/gallery.service";
import {Image} from "../../models/image";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  openModalWindow:boolean=false;
  imagePointer:number;
  /*images = [
    { thumb: 'assets/img/chambre_gouzilh_1_mini.png', img: 'assets/img/chambre_gouzilh_1.png', description: 'Image 1' },
    { thumb: 'assets/img/chambre_gouzilh_2_mini.png', img: 'assets/img/chambre_gouzilh_2.png', description: 'Image 2' }
  ];*/

  // Local properties
  images: Image[];

  constructor(
    private galleryService: GalleryService
  ) { }

  loadImages(){
    console.log('loadImages');
    // Get all comments
    this.galleryService.listImages()
      .subscribe(
        images => this.images = images, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  ngOnInit(){
    this.loadImages();
  }

}
