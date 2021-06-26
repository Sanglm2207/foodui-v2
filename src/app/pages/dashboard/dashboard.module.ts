import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {SharesModule} from '../../shares/shares.module';
import { ContactsComponent } from './contacts/contacts.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { KittenComponent } from './kitten/kitten.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, ContactsComponent, ElectricityComponent, ElectricityChartComponent, KittenComponent, RoomsComponent],
  imports: [
    CommonModule, NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule, 
    RouterModule.forChild(routes),
    SharesModule
  ],
})
export class DashboardModule { }
