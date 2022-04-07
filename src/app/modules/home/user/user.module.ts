import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NebularModule } from '../../../shared/nebular.module';
import { PrimengModule } from '../../../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../../../shared/material.module';
import { ActionUserComponent } from './action-user/action-user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent
}]

@NgModule({
  declarations: [
    UserComponent,
    ActionUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NebularModule,
    PrimengModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MaterialModule
  ],
  providers: [MessageService,ConfirmationService  ]
})
export class UserModule { }
