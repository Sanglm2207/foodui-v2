// @ts-ignore

import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../../../@core/services/_service/product.service';
import {StoreService} from '../../../@core/services/_service/store.service';
import {CityService} from '../../../@core/services/_service/city.service';

@Component({
  selector: 'ngx-action-store',
  templateUrl: './action-store.component.html',
  styleUrls: ['./action-store.component.scss'],
})
export class ActionStoreComponent implements OnInit {
  @Input() action: any;
  @Input() store: any;
  isSubmitted: boolean = false;
  form: FormGroup;
  lstCity: any[] = [];

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private service: StoreService,
    private cityService: CityService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.findAll();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        nameStore: ['', Validators.required],
        createdDate: ['', Validators.required],
        guidCity: ['', Validators.required],
        // guid: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        cityName: ['', Validators.required],

      });
    } else {
      this.form = this.fb.group({
        cityName: [this.store.cityName, Validators.required],
        id: [this.store.id],
        nameStore: [this.store.nameStore, Validators.required],
        createdDate: [new Date(this.store.createdDate), Validators.required],
        guidCity: [this.store.guidCity, Validators.required],
        guid: [this.store.guid],
        phoneNumber: [this.store.phoneNumber, Validators.required],
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
    this.cityService.findAllData().subscribe(res => {
      this.lstCity = res.data;
    });
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.service.saveOrUpdate(this.form.value).subscribe(res => {
        this.spinner.hide();
        if (res.code === 'success') {
          this.modal.close('success');
          this.toastr.success('success');
        } else {
          this.toastr.error('error');
        }
      });
    }
  }

  selectDepartment(event: any) {
    this.spinner.show();
    this.cityService.findOne(event.value).subscribe(res => {
      this.spinner.hide();
      this.form.patchValue({
        cityName: res.data.cityName,
      });
    });
  }
}
