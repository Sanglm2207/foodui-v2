import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from '../../shared/utilities/menu-item';
import { MENU_ITEMS } from './pages-menu';



@Component({
  selector: 'ngx-home',
  template: `
  <ngx-one-column-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>
`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   // menu = MENU_ITEMS;
   menu: NbMenuItem[];


  constructor(private translate: TranslateService
  ) { 
    const lang = sessionStorage.getItem('lang');
    translate.use(lang);
  }


  ngOnInit(): void {
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
