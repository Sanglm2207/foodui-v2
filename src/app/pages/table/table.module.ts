import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharesModule } from '../../shares/shares.module';
import { MessageService, ConfirmationService } from 'primeng/api';


const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
]

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule,
    NgxDatatableModule,
  ],
  providers: [MessageService, ConfirmationService]
})
export class TableModule { }
