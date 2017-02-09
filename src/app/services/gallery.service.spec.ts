/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleryService]
    });
  });

  it('should ...', inject([GalleryService], (service: GalleryService) => {
    expect(service).toBeTruthy();
  }));
});
