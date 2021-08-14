import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import {SharesModule} from '../../shares/shares.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActionCategoryComponent } from './action-category/action-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent, ActionCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CategoryModule { }
