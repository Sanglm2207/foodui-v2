import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../@core/_config/_models/user';
import { UserService } from './user.service';
import {Page} from '../../shares/models/page';
import {DatatableComponent, ColumnMode} from '@swimlane/ngx-datatable';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

class PagedData<T> {
  data: T[];
}

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  displayModal: boolean;

  position: string;

  userDialog: boolean;

  users: User[];

  user: User;

  selectedUsers: User[];

  submitted: boolean;

  constructor(private userService: UserService,
              private primengConfig: PrimeNGConfig,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService) {
              }

  ngOnInit(): void {
    this.getAllUsers();
    this.primengConfig.ripple = true;
  }

  public getAllUsers(): void {
    this.userService.getListUser().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    });
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(data => {
          this.toastr.success("Deleted user successfully!")
          this.getAllUsers();
        })
      }
    });
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveTable() {
    this.submitted = true;

    if (this.user.name.trim()) {
        if (this.user.id) {
            this.users[this.findIndexById(this.user.id)] = this.user;
            this.userService.editUser(this.user, this.user.id).subscribe(data => {
              this.toastr.success('User update successfully !');
              this.getAllUsers();
              this.displayModal = false;
            }, error => {
              console.log(error);
              this.toastr.error('User update failed !');
            })
        }
        else {
          this.userService.createUser(this.user).subscribe(
            data => {
              this.toastr.success('User create successfully !');
              this.getAllUsers();
              this.displayModal = false;
            },
            error => {
              console.log(error);
              this.toastr.error('User create failed !');
            }
          );
        }
        this.users = [...this.users];
        this.userDialog = false;
        this.user = {};
    }
    
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  }

}
