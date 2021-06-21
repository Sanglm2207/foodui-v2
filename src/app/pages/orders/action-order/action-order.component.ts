import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {CityService} from '../../../@core/services/_service/city.service';
import {CustomerTravelService} from '../../../@core/services/_service/customer-travel.service';
import {OrderService} from '../../../@core/services/_service/order.service';

@Component({
  selector: 'ngx-action-order',
  templateUrl: './action-order.component.html',
  styleUrls: ['./action-order.component.scss'],
})
export class ActionOrderComponent implements OnInit {

  @Input() action: boolean;
  isSubmitted: boolean = false;
  form: FormGroup;
  lstCustomer: any[] = [];

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private serviceCus: CustomerTravelService,
    private service: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.findAllCustomer();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        guidCustomer: ['', Validators.required],
      });
    }
  }


  findAllCustomer() {
    this.serviceCus.findAllData().subscribe(res => {
      this.lstCustomer = res.data;
    });
  }

  // addProduct() {
  //   this.products.push(this.fb.control({
  //     this.fb.group({
  //       guidProduct: [''],
  //       quantity: [''],
  //     });
  //   }));
  // }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.service.saveOrUpdate(this.form.value).subscribe(res => {
        this.spinner.hide();
        if (res.code === 'success') {
          this.modal.close('success');
          this.toastr.success(
            this.translate.instant('message.add.success'),
          );
        } else {
          this.toastr.error(
            this.translate.instant(res.code),
          );
        }
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }
}
