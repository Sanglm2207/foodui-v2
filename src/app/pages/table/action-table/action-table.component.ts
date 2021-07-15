import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../table.service';

@Component({
  selector: 'ngx-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss']
})
export class ActionTableComponent implements OnInit {


  @Input() action: any;
  @Input() table: any;
  isSubmitted: boolean = false;
  formTable: FormGroup;
  lstTable: any[] = [];

  constructor(private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.initForm();
    this.findAll();
  }

  initForm() {
    if (this.action) {
      this.formTable = this.fb.group({
        tableNumber: ['', Validators.required],
        seating: ['', Validators.required],
        location: ['', Validators.required],
        posivition: ['', Validators.required],
        status: [true, Validators.required],
      });
    } else {
      this.formTable = this.fb.group({
        id: [this.table.id],
        tableNumber: [this.table.tableNumber, Validators.required],
        seating: [this.table.seating, Validators.required],
        location: [this.table.location, Validators.required],
        posivition: [this.table.posivition, Validators.required],
        status: [this.table.status, Validators.required],
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.formTable.controls;
  }


  findAll() {
    this.tableService.getListTable().subscribe(res => {
      this.lstTable = res;
      console.log(this.lstTable);

    });
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.formTable.valid) {
      this.spinner.show();

      if (this.action) {
        this.tableService.createTable(this.formTable.value).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
            this.close();
          });

      }
      else {
        this.tableService.editTable(this.formTable.value, this.table.id).subscribe(data => {
          this.toastr.success('Table update successfully !');
          this.close();
        })
      }

    }
  }
}
