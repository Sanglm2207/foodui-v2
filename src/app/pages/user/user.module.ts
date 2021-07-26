import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharesModule } from '../../shares/shares.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { ActionUserComponent } from './action-user/action-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
];

@NgModule({
  declarations: [
    UserComponent,
    ActionUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharesModule,
  ],
  providers: [ MessageService, ConfirmationService],

})
export class UserModule { }
