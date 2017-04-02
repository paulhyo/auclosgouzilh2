import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {ActivityDTO} from "../../models/activityDto";
import {LangChangeEvent, TranslateService} from "ng2-translate";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

  private langSubscription: Subscription;

  public oneAtATime:boolean = true;
  public myInterval:number = 3000;
  public noWrapSlides:boolean = false;

  activities: ActivityDTO[] = [];

  slides: Array<any> = [
  {
    id: 0,
    image: 'assets/img/activities_etang_jemaye.png',
    text: 'Le Grand Etang de La Jemaye'
  },
  {
    id: 1,
    image: 'assets/img/activities_lac_de_gurson.png',
    text: 'Lac de Gurson'
  },
  {
    id: 2,
    image: 'assets/img/activities_antilles_jonzac.png',
    text: 'Les Antilles de Jonzac'
  }
];

  constructor(
    private activityService: ActivityService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    //console.log("ActivitiesComponent.ngOnInit: loadActivities");
    this.loadActivities();
    this.langSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      //console.log("ActivitiesComponent.onLangChange: loadActivities");
      this.loadActivities();
    });
  }

  loadActivities() {
    this.activities = [];
    this.activityService.getActivityAndItems()
      .subscribe(activities => {
        this.activities = activities;
        this.activities[0].active = true;
        console.log(activities);
      });
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }

}
