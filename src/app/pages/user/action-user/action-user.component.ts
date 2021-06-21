import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-action-user',
  templateUrl: './action-user.component.html',
  styleUrls: ['./action-user.component.scss'],
})
export class ActionUserComponent implements OnInit {


  @Input() action: any;
  @Input() product: any;
  isSubmitted: boolean = false;
  form: FormGroup;
  lstStore: any[] = [];

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.findAll();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        productName: ['', Validators.required],
        description: [''],
        size: ['', Validators.required],
        weight: ['', Validators.required],
        price: ['', Validators.required],
        guidStore: ['', Validators.required],
        quantity: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        id: [this.product.id],
        guid: [this.product.guid],
        productName: [this.product.productName, Validators.required],
        description: [this.product.description],
        size: [this.product.size, Validators.required],
        weight: [this.product.weight, Validators.required],
        price: [this.product.price, Validators.required],
        guidStore: [this.product.guidStore, Validators.required],
        quantity: [this.product.quantity, Validators.required],
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }

  findAll() {
    // this.storeService.findAllData().subscribe(res => {
    //   this.lstStore = res.data;
    // });
  }

  processSaveOrUpdate() {
    // this.isSubmitted = true;
    // if (this.form.valid) {
    //   this.spinner.show();
    //   this.service.saveOrUpdate(this.form.value).subscribe(res => {
    //     this.spinner.hide();
    //     if (res.code === 'success') {
    //       this.modal.close('success');
    //       this.toastr.success('success');
    //     } else {
    //       this.toastr.error('error');
    //     }
    //   });
    // }
  }
}

