import {Component, OnInit, OnDestroy} from '@angular/core';
import {VisitService} from "../../services/visit.service";
import {VisitDTO} from "../../models/visitDto";
import {LangChangeEvent, TranslateService} from "ng2-translate";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit, OnDestroy {

  private langSubscription: Subscription;

  public oneAtATime:boolean = true;
  public myInterval:number = 3000;
  public noWrapSlides:boolean = false;

  visits: VisitDTO[] = [];

  slides: Array<any> = [
  {
    id: 0,
    image: 'assets/img/visit_saint_emilion.png',
    text: 'Saint-Emilion'
  },
  {
    id: 1,
    image: 'assets/img/visit_bordeaux2.png',
    text: 'Bordeaux'
  },
  {
    id: 2,
    image: 'assets/img/visit_jonzac2.png',
    text: 'Jonzac'
  }
];

  constructor(
    private visitService: VisitService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    console.log("VisitComponent.ngOnInit: loadVisits");
    this.loadVisits();
    this.langSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("VisitComponent.onLangChange: loadVisits");
      this.loadVisits();
    });
  }

  loadVisits() {
    this.visits = [];
    this.visitService.getVisitAndItems()
      .subscribe(visits => {
        this.visits = visits;
        this.visits[0].active = true;
        console.log(visits);
      });
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }

}
