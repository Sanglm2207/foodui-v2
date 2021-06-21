import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {DEFAULT_MODAL_OPTIONS, SMALL_MODAL_OPTIONS} from '../../@core/app-config';
import {ActionOrderComponent} from './action-order/action-order.component';
import {OrderService} from '../../@core/services/_service/order.service';
import {Router} from '@angular/router';
import {DeleteOrderComponent} from './delete-order/delete-order.component';

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  total: any;
  listOrder: any[] = [];
  formSearch: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private modal: NgbModal,
    private service: OrderService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.formSearch.controls;
  }

  initForm() {
    this.formSearch = this.fb.group({
      customerName: [''],
    });
  }

  processSearch(event?: any) {
    this.processSearchData(event);
  }

  processSearchData(event?: any) {
    this.spinner.show();
    this.service.search(this.formSearch.value, event).subscribe(res => {
      this.spinner.hide();
      this.listOrder = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSave() {
    const modalRef = this.modal.open(ActionOrderComponent, SMALL_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteOrderComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idOrder = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  processDetail(guid: any) {

  }
}
