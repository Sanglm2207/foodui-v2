import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { User } from '../../../@core/models/user.model';
import { ActionUserComponent } from './action-user/action-user.component';
import { UserService } from './user.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];

  user: User;

  formUser: FormGroup;

  columns = [
    { prop: 'name' }, 
    { name: 'Avatar', prop: 'avatar' }, 
    { name: 'Phone', prop: 'phoneNumber' }, 
    { name: 'Birthday' },
    { name: "Email"}
  ];

  timeout: any;

  ColumnMode = ColumnMode;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllUser();
    this.initForm();
  }

  initForm() {
    this.formUser = this.fb.group({
      name:  ['', Validators.required],
      avatar: ['', Validators.required],
      birthday: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      roles: this.fb.array([
        this.fb.control('')
      ])
    })
  }

  getAllUser() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);

    })
  }

  processCreate(): void {
    const dialogRef = this.dialog.open(ActionUserComponent, {
      width: '1200px',
    });
    dialogRef.componentInstance.action = true;

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });
  }


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
