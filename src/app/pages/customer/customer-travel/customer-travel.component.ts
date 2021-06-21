import {Component, Input, OnInit} from '@angular/core';
import {DEFAULT_MODAL_OPTIONS} from '../../../@core/app-config';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActionTravelComponent} from './action-travel/action-travel.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerTravelService} from '../../../@core/services/_service/customer-travel.service';
import {ActionCityComponent} from '../../city/action-city/action-city.component';
import {DeleteTravelComponent} from './delete-travel/delete-travel.component';

@Component({
  selector: 'ngx-customer-travel',
  templateUrl: './customer-travel.component.html',
  styleUrls: ['./customer-travel.component.scss'],
})
export class CustomerTravelComponent implements OnInit {

  @Input() dataSearch: FormGroup;

  total: any;
  lstCustomerTravel: any[] = [];
  lstDel: any[] = [];
  formSearch: FormGroup;

  constructor(
    private modal: NgbModal,
    private service: CustomerTravelService,
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
      this.lstCustomerTravel = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSaveOrUpdate() {
    const modalRef = this.modal.open(ActionTravelComponent, DEFAULT_MODAL_OPTIONS);
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
    const modalRef = this.modal.open(ActionTravelComponent, DEFAULT_MODAL_OPTIONS);
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
