import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../../../@core/services/_service/product.service';
import {StoreService} from '../../../@core/services/_service/store.service';

@Component({
  selector: 'ngx-delete-store',
  templateUrl: './delete-store.component.html',
  styleUrls: ['./delete-store.component.scss'],
})
export class DeleteStoreComponent implements OnInit {
  @Input() idStore: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: StoreService,
  ) {
  }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteById(this.idStore).subscribe(res => {
      this.spinner.hide();
      if (res.code === 'success') {
        this.modal.close('success');
        this.toastr.success('success');
      } else {
        this.toastr.error('fail');
      }
    });
  }

  close() {
    this.modal.close();
  }
}
