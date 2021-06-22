import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Page } from '../../shares/models/page';
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

  page = new Page();
  loadingIndicator = true;
  reorderable = true;
  rows = [];
  expanded: any = {};
  timeout: any;


  columns = [
    { name: 'No', prop: 'no' },
    { name: 'Name', prop: 'tableNumber' },
    { name: 'Seating', prop: 'seating' },
    { name: 'Location', prop: 'location' },
    { name: 'Posivition', prop: 'posivition' },
    { name: 'Status', prop: 'status' },
    { name: 'Action', prop: 'action' },
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ColumnMode = ColumnMode;

  displayModal: boolean;

  position: string;

  tableForm: FormGroup;
  
  constructor(private tableService: TableService,
              private spinner: NgxSpinnerService,
              private el: ElementRef,
              private primengConfig: PrimeNGConfig,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.initForm();
    this.primengConfig.ripple = true;
  }

  public initForm() {
    this.tableForm = this.fb.group({
      tableNumber: ['', Validators.required],
      seating: ['', Validators.required],
      location: ['', Validators.required],
      posivition: ['', Validators.required],
      status: [true]
    })
  }

  get f() {
    return this.tableForm.controls;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  public getAllUsers(): void {
    this.tableService.getListTable().subscribe(data => {
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

  showModalDialog() {
    this.displayModal = true;
}

save() {
  this.tableService.createTable(this.tableForm.value)
    .subscribe(
      data => {
        this.toastr.success('Thêm mới thành công');
        this.getAllUsers();
        this.displayModal=false;
      },
      error => {
        console.log(error);
        this.toastr.error('Thêm mới thất bại !');
      }
    );
}

public deleteTable(id: number) {
  this.tableService.deleteTable(id).subscribe(data => {
    this.toastr.success("Deleted table successfully!")
    this.getAllUsers();
  })
}



}
