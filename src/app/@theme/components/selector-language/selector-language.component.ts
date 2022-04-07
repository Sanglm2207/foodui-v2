import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'selector-language',
  templateUrl: './selector-language.component.html',
  styleUrls: ['./selector-language.component.scss']
})
export class SelectorLanguageComponent implements OnInit {

  // currentTheme: string;

  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/svg/flags/226-united-states.svg',
    },
    {
      lang: 'vi',
      name: 'Vietnamese',
      flag: './assets/media/svg/flags/220-vietnam.svg',
    },
  ];

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('vi');
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
