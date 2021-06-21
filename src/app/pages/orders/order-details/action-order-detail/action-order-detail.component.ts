import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {OrderService} from '../../../../@core/services/_service/order.service';
import {ProductService} from '../../../../@core/services/_service/product.service';
import {OrderDetailsService} from '../../../../@core/services/_service/order-details.service';

@Component({
  selector: 'ngx-action-order-detail',
  templateUrl: './action-order-detail.component.html',
  styleUrls: ['./action-order-detail.component.scss'],
})
export class ActionOrderDetailComponent implements OnInit {
  @Input() guid: any;
  form: FormGroup;
  lstProducts: any[] = [];
  isSubmitted: boolean = false;
  check: boolean = true;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private serviceProduct: ProductService,
    private service: OrderDetailsService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.findAllProduct();
  }

  initForm() {
    this.form = this.fb.group({
      guidOrder: [this.guid],
      guidProduct: ['', Validators.required],
      price: [''],
      quantity: ['', Validators.required],
      quantityProduct: [''],
    });
  }

  findAllProduct() {
    this.serviceProduct.findAllData().subscribe(res => {
      this.lstProducts = res.data;
    });
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.form.valid && this.check) {
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
      }, error => {
        this.spinner.hide();
      });
    }
  }

  selectProduct(event: any) {
    this.spinner.show();
    this.serviceProduct.findOne(event.value).subscribe(res => {
      this.spinner.hide();
      this.form.patchValue({
        price: res.data.price,
      });
      this.form.patchValue({
        quantityProduct: res.data.quantity,
      });
    });
  }

  getQuantity(event: FocusEvent) {
    // @ts-ignore
    const quantity = event.target.value;
    const quantityProduct = this.form.get('quantityProduct').value;
    if (quantity > quantityProduct) {
      this.check = false;
    } else {
      this.form.patchValue({
        quantityProduct: (quantityProduct - quantity),
      });
    }
  }
}
