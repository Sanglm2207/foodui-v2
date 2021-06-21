import {Injectable} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  language$ = new ReplaySubject<LangChangeEvent>(1);


  constructor(private translateService: TranslateService) {
  }

  setInitState() {
    this.translateService.addLangs(['en', 'vi']);
    const browserLang = sessionStorage.getItem('lang');
    if (!browserLang || browserLang === 'undefined') {
      this.setLang('vi');
    } else {
      this.setLang(browserLang);
    }
  }

  setLang(lang: string) {
    this.translateService.onLangChange.pipe(take(1)).subscribe(result => {
      this.language$.next(result);
    });
    this.translateService.use(lang);
    sessionStorage.setItem('lang', lang);
  }
}
