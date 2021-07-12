import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import { RouterModule, Routes } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import {SharesModule} from '../../shares/shares.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ActionFoodComponent } from './action-food/action-food.component';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent,
  },
];

@NgModule({
  declarations: [FoodComponent, ActionFoodComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule,
  ],
  providers: [MessageService, ConfirmationService, DialogService ],
})
export class FoodModule { }
