import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {RouterModule, Routes} from '@angular/router';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { ActionOrderComponent } from './action-order/action-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import {DropdownModule} from 'primeng/dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import { ActionOrderDetailComponent } from './order-details/action-order-detail/action-order-detail.component';
import {InputTextModule} from "primeng/inputtext";
import { DeleteOrderDetailComponent } from './order-details/delete-order-detail/delete-order-detail.component';


const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    // children
  },
  {
    path: 'detail/:guid',
    component: OrderDetailsComponent,
  },
];

@NgModule({
  declarations: [OrderComponent, ActionOrderComponent, OrderDetailsComponent, DeleteOrderComponent, ActionOrderDetailComponent, DeleteOrderDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PortletModule,
    TranslateModule,
    NgxSpinnerModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
})
export class OrdersModule { }
