import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../@core/_config/_models/user';
import { UserService } from './user.service';
import { Page } from '../../shares/models/page';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { CryptoService } from '../../@core/services/crypto.service';
import crypto from 'crypto-js';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionUserComponent } from './action-user/action-user.component';
import { DEFAULT_MODAL_OPTIONS } from '../../@core/app-config';


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

  users: User[];

  user: User;

  selectedUsers: User[];

  submitted: boolean;

 

  constructor(private userService: UserService,
    private primengConfig: PrimeNGConfig,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog,
    private modal: NgbModal
    ) {
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


  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(data => {
          this.toastr.success("Deleted user successfully!")
          this.getAllUsers();
          window.location.reload();
        })
      }
    });
  }


  processEdit(user: any) {
    const modalRef = this.modal.open(ActionUserComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.user = user;
    modalRef.result.then(value => {
      if (value) {
        this.getAllUsers();
      }
    },
    );
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionUserComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value) {
        this.getAllUsers();
      }
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "users");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }


}
