import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { I18nService } from './core/service/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private i18n: I18nService
  ) {
    let currentLanguage = this.i18n.getCurrentLang();
    this.translate.setDefaultLang(currentLanguage || 'en');
  }
}
