import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MenuItem} from 'primeng/api';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  formSearch: FormGroup;
  isSubmitted: boolean = false;



  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formSearch = this.fb.group({
      customerName: [''],
      nameDepartment: [''],
      postalAddress: [''],
      tourGuide: [''],
    });
  }


  processSearch() {
  }

}
