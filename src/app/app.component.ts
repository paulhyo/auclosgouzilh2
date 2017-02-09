import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private translate: TranslateService,
    private _logger: Logger) {

    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    console.log("user language: " + userLang);

    translate.addLangs(["en", "fr", "de"]);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);

    //translate.getTranslation(userLang);

    this._logger.info(translate.getLangs());
    console.log(translate);
  }

  selectLang(lang: string) {
    console.log("selectLang: " + lang);
    this.translate.use(lang);
  }
}
