import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActionOrderDetailComponent} from './action-order-detail/action-order-detail.component';
import {DEFAULT_MODAL_OPTIONS} from '../../../@core/app-config';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {OrderDetailsService} from '../../../@core/services/_service/order-details.service';
import {DeleteOrderDetailComponent} from './delete-order-detail/delete-order-detail.component';

@Component({
  selector: 'ngx-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  listOrderDetails: any[] = [];
  guidOrder: any;
  form: FormGroup;

  constructor(
    private sub: ActivatedRoute,
    private modal: NgbModal,
    private service: OrderDetailsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.guidOrder = this.sub.snapshot.paramMap.get('guid');
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      guidOrder: [this.guidOrder],
    });
  }

  processSave() {
    const modalRef = this.modal.open(ActionOrderDetailComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.guid = this.guidOrder;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  processSearch(event?: any) {
    this.processSearchData(event);
  }

  processSearchData(event?: any) {
    this.spinner.show();
    this.service.search(this.form.value).subscribe(res => {
      this.spinner.hide();
      this.listOrderDetails = res.data;
    });
  }


  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteOrderDetailComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idOrderDetail = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }
}
