import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../@core/services/_service/product.service';
import { User } from '../../@core/_config/_models/user';
import { UserService } from './user.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userDialog: boolean;

  users: User[];

  user: User;

  selectedUsers: User[];

  submitted: boolean;

  statuses: any[];

  
  constructor(private modal: NgbModal,
              private fb: FormBuilder,
              private userService: UserService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getListUser();
  }

  

  getListUser() {
    this.userService.getListUser().subscribe(res => {
      this.users = res.data;
    });
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
}

deleteSelectedUsers() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.users = this.users.filter(val => !this.selectedUsers.includes(val));
          this.selectedUsers = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
      }
  });
}

editUser(user: User) {
  this.user = {...user};
  this.userDialog = true;
}

deleteUser(user: User) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.users = this.users.filter(val => val.id !== user.id);
          this.user = {};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      }
  });
}

hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

saveProduct() {
  this.submitted = true;

  if (this.user.name.trim()) {
      if (this.user.id) {
          this.users[this.findIndexById(this.user.id)] = this.user;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
      }
      else {
          this.user.id = this.createId();
          this.users.push(this.user);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
  }
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
          index = i;
          break;
      }
  }
  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
  // processEdit(item: any) {
  //   const modalRef = this.modal.open(ActionProductComponent, DEFAULT_MODAL_OPTIONS);
  //   modalRef.componentInstance.action = false;
  //   modalRef.componentInstance.product = item;
  //   modalRef.result.then(value => {
  //       if (value === 'success') {
  //         this.processSearchData();
  //       }
  //     },
  //   );
  // }

  

  // processSave($event: any) {
  //   const modalRef = this.modal.open(ActionProductComponent, DEFAULT_MODAL_OPTIONS);
  //   modalRef.componentInstance.action = true;
  //   modalRef.result.then(value => {
  //     if (value === 'success') {
  //       this.processSearchData();
  //     }
  //   }, (reason) => {

  //   });
  // }

  // processDelete(id: any) {
  //   const modalRef = this.modal.open(DeleteProductComponent, DEFAULT_MODAL_OPTIONS);
  //   modalRef.componentInstance.idProduct = id;
  //   modalRef.result.then(value => {
  //     if (value === 'success') {
  //       this.processSearchData();
  //     }
  //   }, (reason) => {
  //   });
  // }
}
