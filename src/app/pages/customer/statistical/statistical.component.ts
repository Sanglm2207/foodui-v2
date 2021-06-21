import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../@core/services/_service/customer.service';

@Component({
  selector: 'ngx-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent implements OnInit {
  guid: any;
  form: FormGroup;
  data: any;

  constructor(
    private sub: ActivatedRoute,
    private fb: FormBuilder,
    private service: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.guid = this.sub.snapshot.paramMap.get('guid');
    this.initForm();
    this.processStatistical();
  }

  initForm() {
    this.form = this.fb.group({
      guid: [this.guid],
    });
  }

  processStatistical() {
    this.service.statistical(this.form.value).subscribe(res => {
      this.data = res.data;
    });
  }

}
