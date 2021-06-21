import {Component, OnInit} from '@angular/core';
import {DeleteTravelComponent} from '../customer-travel/delete-travel/delete-travel.component';
import {DEFAULT_MODAL_OPTIONS} from '../../../@core/app-config';
import {ActionTravelComponent} from '../customer-travel/action-travel/action-travel.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerPostalService} from '../../../@core/services/_service/customer-postal.service';
import {ActionPostalComponent} from './action-postal/action-postal.component';

@Component({
  selector: 'ngx-customer-postal',
  templateUrl: './customer-postal.component.html',
  styleUrls: ['./customer-postal.component.scss'],
})
export class CustomerPostalComponent implements OnInit {
  total: any;
  lstCustomerPostal: any[] = [];
  lstDel: any[] = [];
  formSearch: FormGroup;

  constructor(
    private modal: NgbModal,
    private service: CustomerPostalService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formSearch = this.fb.group({
      name: [''],
    });
  }

  processSearch(event?: any) {
    this.processSearchData(event);
  }

  processSearchData(event?: any) {
    this.spinner.show();
    this.service.search(this.formSearch.value, event).subscribe(res => {
      this.spinner.hide();
      this.lstCustomerPostal = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSaveOrUpdate() {
    const modalRef = this.modal.open(ActionPostalComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearch();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionPostalComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.customer = item;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteTravelComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idCus = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

}
