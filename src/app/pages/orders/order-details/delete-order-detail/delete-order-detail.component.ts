import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {OrderDetailsService} from '../../../../@core/services/_service/order-details.service';

@Component({
  selector: 'ngx-delete-order-detail',
  templateUrl: './delete-order-detail.component.html',
  styleUrls: ['./delete-order-detail.component.scss'],
})
export class DeleteOrderDetailComponent implements OnInit {
  @Input() idOrderDetail: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: OrderDetailsService,
  ) { }

  ngOnInit(): void {
  }
  processDelete() {
    this.spinner.show();
    this.service.deleteById(this.idOrderDetail).subscribe(res => {
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
