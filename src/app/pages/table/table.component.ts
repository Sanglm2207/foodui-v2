import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DEFAULT_MODAL_OPTIONS } from '../../@core/app-config';
import { ActionTableComponent } from './action-table/action-table.component';
import { Table } from './table.model';
import { TableService } from './table.service';

class PagedData<T> {
  data: T[];
}

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayModal: boolean;

  position: string;

  tableDialog: boolean;

  tables: Table[];

  table: Table;

  selectedTables: Table[];

  submitted: boolean;

  statuses: any[];

  existingNameList: any = [];

  lstDel: any[] = [];
  total: any;
  listTable: any[] = [];

  constructor(private tableService: TableService,
    private primengConfig: PrimeNGConfig,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllTables();
    this.primengConfig.ripple = true;
    this.statuses = [
      { label: "Đã đặt", value: "true" },
      { label: "Còn trống", value: "false" }
    ];
  }


  public getAllTables(): void {
    this.tableService.getListTable().subscribe(data => {
      this.tables = data;
      for (let item in data) {
        this.existingNameList.push(data[item].tableNumber);
      }
    }, error => {
      console.log(error);
    });
  }


  deleteTable(table: Table) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + table.tableNumber + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tableService.deleteTable(table.id).subscribe(data => {
          this.toastr.success("Deleted table successfully!")
          this.getAllTables();
          this.refresh();
        })
      }
    });
  }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionTableComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.table = item;
    modalRef.result.then(value => {
        if (value) {
          this.getAllTables();
        }
      },
    );
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionTableComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value) {
        this.getAllTables();
      }
    }, (reason) => {

    });
  }

  refresh(): void {
    window.location.reload();
  }
}
