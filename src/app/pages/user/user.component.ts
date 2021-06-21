import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../@core/_config/_models/user';
import { UserService } from './user.service';
import {Page} from '../../shares/models/page';
import {DatatableComponent, ColumnMode} from '@swimlane/ngx-datatable';

class PagedData<T> {
  data: T[];
}

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  page = new Page();
  loadingIndicator = true;
  reorderable = true;
  rows = [];
  expanded: any = {};
  timeout: any;


  columns = [
    { name: 'No', prop: 'no' },
    { name: 'Username', prop: 'username' },
    { name: 'Fullname', prop: 'name' },
    { name: 'Phone', prop: 'phoneNumber' },
    { name: 'Email', prop: 'email' },
    { name: 'Address', prop: 'address' },
    { name: 'Vai trò', prop: 'status' },
    { name: 'Action', prop: 'action' },
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private el: ElementRef) {
              }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  public getAllUsers(): void {
    this.userService.getListUser().subscribe(data => {
      this.rows = data as string[];
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    }, error => {
      console.log(error);
    });
  }


  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }




}
