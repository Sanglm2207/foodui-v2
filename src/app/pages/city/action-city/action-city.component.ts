import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {CityService} from '../../../@core/services/_service/city.service';

@Component({
  selector: 'ngx-action-city',
  templateUrl: './action-city.component.html',
  styleUrls: ['./action-city.component.scss'],
})
export class ActionCityComponent implements OnInit {
  @Input() action: any;
  @Input() city: any;
  isSubmitted: boolean = false;
  form: FormGroup;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private service: CityService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.action) {
      this.form = this.fb.group({
        cityName: ['', Validators.required],
        address: ['', Validators.required],
        state: ['', Validators.required],
        nameDepartment: ['', Validators.required],
        createdDate: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        id: [this.city.id],
        cityName: [this.city.cityName, Validators.required],
        address: [this.city.address, Validators.required],
        state: [this.city.state, Validators.required],
        nameDepartment: [this.city.nameDepartment, Validators.required],
        createdDate: [new Date(this.city.createdDate), Validators.required],
      });
    }
  }

  close() {
    this.modal.close();
  }

  get f() {
    return this.form.controls;
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
