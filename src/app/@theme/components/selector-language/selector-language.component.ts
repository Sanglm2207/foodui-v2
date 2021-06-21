import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../@core/services/_service/language.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'ngx-selector-language',
  templateUrl: './selector-language.component.html',
  styleUrls: ['./selector-language.component.scss'],
})
export class SelectorLanguageComponent implements OnInit {
  currentTheme: string;

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

  constructor(
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.setLanguage();
  }

  setLanguage() {
    const lang = sessionStorage.getItem('lang');
    if (lang) {
      this.languages.forEach((language: LanguageFlag) => {
        if (language.lang === lang) {
          this.currentTheme = language.flag;
        }
      });
    } else {
      this.currentTheme = './assets/media/svg/flags/220-vietnam.svg';
      this.changeTheme('vi');
    }

  }

  changeTheme(lang: any) {
    this.currentTheme = lang.flag;
    this.languageService.setLang(lang.lang);
    window.location.reload();
  }

}
