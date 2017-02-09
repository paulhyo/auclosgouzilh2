import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AlertModule, AccordionModule, CarouselModule, TabsModule } from 'ng2-bootstrap';
import { RouterModule }   from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';
import { Logger, Options, Level } from "angular2-logger/core";
//import { ImageModal } from 'angular2-image-popup/directives/angular2-image-popup/image-modal-popup';
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

// used to create fake backend
import { fakeBackendProvider } from './helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { LoggedInGuard } from './components/login/logged-in.guard';

import './rxjs-extensions';
import { ActivitiesComponent } from './components/activities/activities.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { VisitComponent } from './components/visit/visit.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { MediaImageModalComponent } from './components/media-image-modal/media-image-modal.component';
import {Configuration} from "./app.constants";
import {VisitService} from "./services/visit.service";
import { ActivityAdminComponent } from './components/activity-admin/activity-admin.component';
import {ActivityListAdminComponent} from "./components/activity-admin/activity-list-admin.component";
import {ActivityBoxAdminComponent} from "./components/activity-admin/activity-box-admin.component";
import {ActivityFormAdminComponent} from "./components/activity-admin/activity-form-admin.component";
import {ActivityService} from "./services/activity.service";
import {ActivityItemService} from "./services/activity-item.service";
import {ActivityItemAdminComponent} from "./components/activity-item-admin/activity-item-admin.component";
import {ActivityItemListAdminComponent} from "./components/activity-item-admin/activity-item-list-admin.component";
import {ActivityItemBoxAdminComponent} from "./components/activity-item-admin/activity-item-box-admin.component";
import {ActivityItemFormAdminComponent} from "./components/activity-item-admin/activity-item-form-admin.component";
import { VisitItemAdminComponent } from './components/visit-item-admin/visit-item-admin.component';
import {VisitListAdminComponent} from "./components/visit-admin/visit-list-admin.component";
import {VisitBoxAdminComponent} from "./components/visit-admin/visit-box-admin.component";
import {VisitFormAdminComponent} from "./components/visit-admin/visit-form-admin.component";
import {VisitItemFormAdminComponent} from "./components/visit-item-admin/visit-item-form-admin.component";
import {VisitItemBoxAdminComponent} from "./components/visit-item-admin/visit-item-box-admin.component";
import {VisitItemListAdminComponent} from "./components/visit-item-admin/visit-item-list-admin.component";
import {VisitAdminComponent} from "./components/visit-admin/visit-admin.component";
import {VisitItemService} from "./services/visit-item.service";
import { GalleryAdminComponent } from './components/gallery-admin/gallery-admin.component';
import {GalleryService} from "./services/gallery.service";
import {ContactService} from "./services/contact.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    AdminComponent,
    ActivitiesComponent,
    GalleryComponent,
    RoomsComponent,
    VisitComponent,
    PresentationComponent,
    ImageModalComponent,
    MediaImageModalComponent,
    VisitAdminComponent,
    VisitListAdminComponent,
    VisitBoxAdminComponent,
    VisitFormAdminComponent,
    VisitItemAdminComponent,
    VisitItemListAdminComponent,
    VisitItemBoxAdminComponent,
    VisitItemFormAdminComponent,
    ActivityAdminComponent,
    ActivityListAdminComponent,
    ActivityBoxAdminComponent,
    ActivityFormAdminComponent,
    ActivityItemAdminComponent,
    ActivityItemListAdminComponent,
    ActivityItemBoxAdminComponent,
    ActivityItemFormAdminComponent,
    GalleryAdminComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    Ng2Bs3ModalModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'presentation', component: PresentationComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'visit', component: VisitComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard]},
      { path: 'admin-visit', component: VisitAdminComponent, canActivate: [LoggedInGuard]},
      { path: 'admin-visit-item/:visitId', component: VisitItemAdminComponent, canActivate: [LoggedInGuard]},
      { path: 'admin-activity', component: ActivityAdminComponent, canActivate: [LoggedInGuard]},
      { path: 'admin-activity-item/:activityId', component: ActivityItemAdminComponent, canActivate: [LoggedInGuard]},
      { path: 'admin-gallery', component: GalleryAdminComponent, canActivate: [LoggedInGuard]},
      //{ path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard] }
      //{ path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    Configuration,
    AuthenticationService,
    VisitService,
    VisitItemService,
    ActivityService,
    ActivityItemService,
    GalleryService,
    ContactService,
    UserService,
    LoggedInGuard,
    { provide: Options, useValue: { level: Level.INFO } },
    Logger,
    // providers used to create fake backend
    /*fakeBackendProvider,
    MockBackend,
    BaseRequestOptions*/
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
