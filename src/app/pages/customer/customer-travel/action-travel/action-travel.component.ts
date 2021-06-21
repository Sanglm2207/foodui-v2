import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {CityService} from '../../../../@core/services/_service/city.service';
import {CustomerTravelService} from '../../../../@core/services/_service/customer-travel.service';

@Component({
  selector: 'ngx-action-travel',
  templateUrl: './action-travel.component.html',
  styleUrls: ['./action-travel.component.scss'],
})
export class ActionTravelComponent implements OnInit {
  @Input() action: any;
  @Input() customer: any;
  isSubmitted = false;
  form: FormGroup;
  lstCity: any[] = [];


  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private serviceCity: CityService,
    private service: CustomerTravelService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.processFindCity();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        guidCity: ['', Validators.required],
        customerName: ['', Validators.required],
        tourGuide: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        id: [this.customer.id],
        guid: [this.customer.guid],
        guidCity: [this.customer.guidCity, Validators.required],
        customerName: [this.customer.customerName, Validators.required],
        tourGuide: [this.customer.tourGuide, Validators.required],
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
  }

  processFindCity() {
    this.serviceCity.findAllData().subscribe(res => {
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
}
