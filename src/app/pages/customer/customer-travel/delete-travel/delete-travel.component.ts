import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {CustomerTravelService} from '../../../../@core/services/_service/customer-travel.service';

@Component({
  selector: 'ngx-delete-travel',
  templateUrl: './delete-travel.component.html',
  styleUrls: ['./delete-travel.component.scss'],
})
export class DeleteTravelComponent implements OnInit {

  @Input() idCus: any;
  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: CustomerTravelService,
  ) { }

  ngOnInit(): void {
  }
  processDelete() {
    this.spinner.show();
    this.service.deleteById(this.idCus).subscribe(res => {
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
