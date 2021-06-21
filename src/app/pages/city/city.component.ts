import {Component, OnInit} from '@angular/core';
import {DEFAULT_MODAL_OPTIONS} from '../../@core/app-config';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActionCityComponent} from './action-city/action-city.component';
import {CityService} from '../../@core/services/_service/city.service';
import {DeleteCityComponent} from './delete-city/delete-city.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'ngx-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  lstDel: any[] = [];
  total: any;
  listCity: any[] = [];
  formSearch: FormGroup;
  isSubmitted: boolean = false;
  lstDataSearch: any[] = [];
  lstProduct: any[] = [];

  constructor(
    private modal: NgbModal,
    private service: CityService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataSearch();
  }

  get f() {
    return this.formSearch.controls;
  }

  initForm() {
    this.formSearch = this.fb.group({
      cityName: [''],
      state: [''],
      productName: [''],
    });
  }

  getDataSearch() {
    this.service.findAllData().subscribe(res => {
      this.lstDataSearch = res.data;
    });
  }

  getDataSearchProduct() {

  }

  processSearch(event?: any) {
    this.processSearchData(event);
  }

  processEdit(item: any) {
    const modalRef = this.modal.open(ActionCityComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.city = item;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }


  processSearchData(event?: any) {
    this.spinner.show();
    this.service.search(this.formSearch.value, event).subscribe(res => {
      this.spinner.hide();
      this.listCity = res.data;
      this.total = res.recordsTotal;
    });
  }

  processSave() {
    const modalRef = this.modal.open(ActionCityComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }

  processDelete(id: any) {
    const modalRef = this.modal.open(DeleteCityComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.idCity = id;
    modalRef.result.then(value => {
      if (value === 'success') {
        this.processSearchData();
      }
    }, (reason) => {
    });
  }
}
