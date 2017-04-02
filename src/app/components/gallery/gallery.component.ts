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
