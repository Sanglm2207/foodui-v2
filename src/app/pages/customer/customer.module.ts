import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerComponent} from './customer.component';
import {RouterModule, Routes} from '@angular/router';
import {CustomerTravelComponent} from './customer-travel/customer-travel.component';
import {CustomerPostalComponent} from './customer-postal/customer-postal.component';
import {ActionTravelComponent} from './customer-travel/action-travel/action-travel.component';
import {DeleteTravelComponent} from './customer-travel/delete-travel/delete-travel.component';
import {ActionPostalComponent} from './customer-postal/action-postal/action-postal.component';
import {DeletePostalComponent} from './customer-postal/delete-postal/delete-postal.component';
import {StatisticalComponent} from './statistical/statistical.component';
import { SharesModule } from '../../shares/shares.module';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
  },
  {
    path: 'statistical/:guid',
    component: StatisticalComponent,
  },
];

@NgModule({
  declarations: [CustomerComponent,
    CustomerTravelComponent, CustomerPostalComponent,
    ActionTravelComponent, DeleteTravelComponent, ActionPostalComponent,
    DeletePostalComponent, StatisticalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule
  ],
})
export class CustomerModule {
}
