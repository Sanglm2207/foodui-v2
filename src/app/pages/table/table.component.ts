import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
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


  ColumnMode = ColumnMode;

  displayModal: boolean;

  position: string;

  tableForm: FormGroup;

  tableDialog: boolean;

  tables: Table[];

  table: Table;

  selectedTables: Table[];

  submitted: boolean;

  stateOptions: any[];

  constructor(private tableService: TableService,
    private spinner: NgxSpinnerService,
    private el: ElementRef,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.primengConfig.ripple = true;
    this.stateOptions = [
      { label: "Đã đặt", value: "true" },
      { label: "Còn trống", value: "false" }
    ];
  }


  public getAllUsers(): void {
    this.tableService.getListTable().subscribe(data => {
      this.tables = data;
    }, error => {
      console.log(error);
    });
  }

  openNew() {
    this.table = {};
    this.submitted = false;
    this.tableDialog = true;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  deleteProduct(table: Table) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + table.tableNumber + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tableService.deleteTable(table.id).subscribe(data => {
          this.toastr.success("Deleted table successfully!")
          this.getAllUsers();
        })
      }
    });
  }

  editProduct(table: Table) {
    this.table = { ...table };
    this.tableDialog = true;
  }

  hideDialog() {
    this.tableDialog = false;
    this.submitted = false;
  }

  saveTable() {
    this.tableService.createTable(this.table)
      .subscribe(
        data => {
          this.toastr.success('Thêm mới thành công');
          this.getAllUsers();
          this.displayModal = false;
        },
        error => {
          console.log(error);
          this.toastr.error('Thêm mới thất bại !');
        }
      );
  }
}
