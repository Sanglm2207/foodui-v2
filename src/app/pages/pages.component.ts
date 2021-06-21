import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {MenuItem} from './menu-item';
import {NbMenuItem} from '@nebular/theme';
import {LanguageService} from '../@core/services/_service/language.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  // menu = MENU_ITEMS;
  menu: NbMenuItem[];

  constructor(private languageService: LanguageService,
              private translate: TranslateService) {
    const lang = sessionStorage.getItem('lang');
    translate.use(lang);
  }

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateMenuItems();
    });
    this.translateMenuItems();
  }

  translateMenuItems() {
    this.menu.forEach((item: NbMenuItem) => {
      this.translateMenuItem(item);
    });
  }

  translateMenuItem(menuItem: NbMenuItem) {
    if (menuItem.children != null) {
      menuItem.children.forEach((item: NbMenuItem) => this.translateMenuItem(item));
    }

    if (menuItem.data === undefined) {
      menuItem.data = menuItem.title;
      this.getTranslation(menuItem, menuItem.title);
    } else {
      this.getTranslation(menuItem, menuItem.data);
    }
  }

  getTranslation(item: NbMenuItem, key: string) {
    const k = `sidebar.${key.toLowerCase()}`;
    this.translate.get(k).subscribe((translation: string) => {
      item.title = translation;
    });
  }
}
