import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { SessionService } from '../../../@core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user: any;

  userMenu = [{ title: 'Log out' }];


  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private sessionService: SessionService,
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
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
