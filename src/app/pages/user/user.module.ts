import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharesModule } from '../../shares/shares.module';
import { ActionUserComponent } from './action-user/action-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserService } from './user.service';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
]

@NgModule({
  declarations: [
    UserComponent,
    ActionUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule
  ],
  providers: [UserService, MessageService, ConfirmationService]

})
export class UserModule { }
