import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StoreComponent} from './store.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InputTextModule} from 'primeng/inputtext';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {DeleteStoreComponent} from './delete-store/delete-store.component';
import {ActionStoreComponent} from './action-store/action-store.component';


export const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  },
];

@NgModule({
  declarations: [
    DeleteStoreComponent,
    ActionStoreComponent,
  ],
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

export class StoreModule {
}
