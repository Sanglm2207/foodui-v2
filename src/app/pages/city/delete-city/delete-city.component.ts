import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {CityService} from '../../../@core/services/_service/city.service';

@Component({
  selector: 'ngx-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.scss'],
})
export class DeleteCityComponent implements OnInit {
  @Input() idCity: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: CityService,
  ) {
  }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteById(this.idCity).subscribe(res => {
      this.spinner.hide();
      if (res.code === 'success') {
        this.modal.close('success');
        this.toastr.success(
          this.translate.instant('message.delete.success'),
        );
      } else {
        this.toastr.error(
          this.translate.instant(res.code),
        );
      }
    });
  }

  close() {
    this.modal.close();
  }
}
