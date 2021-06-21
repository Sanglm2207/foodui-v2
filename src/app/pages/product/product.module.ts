import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {ActionProductComponent} from './action-product/action-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {NgxSpinnerModule} from 'ngx-spinner';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import {DropdownModule} from 'primeng/dropdown';
// @ts-ignore

const routes: Routes = [
  {
    // localhost:4200/pages/products
    path: '',
    component: ProductComponent,
  },
];

@
  NgModule({
    declarations: [ActionProductComponent, DeleteProductComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      CalendarModule,
      NgxSpinnerModule,
      InputTextModule,
      PortletModule,
      TooltipModule,
      TableModule,
      ButtonModule,
      DropdownModule,
      FormsModule,
    ],
  })

export class ProductModule {
}
