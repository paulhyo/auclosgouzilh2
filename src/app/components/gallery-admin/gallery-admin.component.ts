import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {Headers, RequestOptions, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Configuration} from "../../app.constants";
import {GalleryService} from "../../services/gallery.service";
import {Image} from "../../models/image";

@Component({
  selector: 'gallery-admin',
  templateUrl: './gallery-admin.component.html',
  styleUrls: ['./gallery-admin.component.css'],
})
export class GalleryAdminComponent implements OnInit {

  private apiEndPoint: string;
  private uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
  hasAnotherDropZoneOver:boolean = false;

  // Local properties
  images: Image[];

  constructor(
    private location: Location,
    private http: Http,
    private _configuration: Configuration,
    private galleryService: GalleryService) {
      //this.apiEndPoint = _configuration.RestServerUrl + 'upload2.php';
      this.apiEndPoint = 'php/upload2.php';
      this.uploader = new FileUploader({url: this.apiEndPoint});
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //console.log("ImageUpload:uploaded:", item, status);
        this.loadImages();
      };
  }

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

  deleteImage(event) {
    this.galleryService.removeImage(event).subscribe(
      images => {
        this.images = images;
        console.log(images);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  goBack(): void {
    this.location.back();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
