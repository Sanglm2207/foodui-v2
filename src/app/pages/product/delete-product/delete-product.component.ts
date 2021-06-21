import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {ProductService} from '../../../@core/services/_service/product.service';

@Component({
  selector: 'ngx-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {
  @Input() idProduct: any;

  constructor(
    private modal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private service: ProductService,
  ) {
  }

  ngOnInit(): void {
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteById(this.idProduct).subscribe(res => {
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
