import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {OrderService} from '../../../@core/services/_service/order.service';

@Component({
  selector: 'ngx-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss'],
})
export class DeleteOrderComponent implements OnInit {
  @Input() idOrder: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: OrderService,
  ) { }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteById(this.idOrder).subscribe(res => {
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
