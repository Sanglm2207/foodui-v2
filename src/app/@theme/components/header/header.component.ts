import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {LayoutService} from '../../../@core/utils/layout.service';
import {UserData} from '../../../@core/utils/user';
import { SessionService } from '../../../@core/services/session.service';
import { User } from '../../../@core/_config/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user: User;

  userMenu = [ { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private sessionService: SessionService,
              private layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.sessionService.getItem('auth-user');

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log out') {
        this.sessionService.removeItem('auth-user');
        this.sessionService.removeItem('auth-token');
        this.router.navigate(['/auth/login']);
      }
    });
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
