import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityComponent} from './city.component';
import {RouterModule, Routes} from '@angular/router';
import {PortletModule} from '../../shares/portlet/portlet.module';
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteCityComponent} from './delete-city/delete-city.component';
import {ActionCityComponent} from './action-city/action-city.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';

const routes: Routes = [
  {
    path: '',
    component: CityComponent,
  },
];

@NgModule({
  declarations: [CityComponent, DeleteCityComponent, ActionCityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PortletModule,
    TooltipModule,
    TableModule,
    TranslateModule,
    NgxSpinnerModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    AutoCompleteModule,
  ],
})
export class CityModule {
}
