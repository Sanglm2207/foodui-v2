import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {SharesModule} from '../../shares/shares.module';
import { ChartPanelComponent } from './chart-panel/chart-panel.component';
import { ChatPanelHeaderComponent } from './chart-panel/chat-panel-header/chat-panel-header.component';
import { ChartsComponent } from './chart-panel/charts/charts.component';
import { CountryOrdersComponent } from './country-orders/country-orders.component';
import { EarningCardComponent } from './earning-card/earning-card.component';
import { LengendChartComponent } from './lengend-chart/lengend-chart.component';
import { ProfitCardComponent } from './profit-card/profit-card.component';
import { ProgressSectionComponent } from './progress-section/progress-section.component';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { TrafficRevealCardComponent } from './traffic-reveal-card/traffic-reveal-card.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { VisitorsAnalyticsComponent } from './visitors-analytics/visitors-analytics.component';
import { ChartPanelSummaryComponent } from './chart-panel/chart-panel-summary/chart-panel-summary.component';
import { EarningCardBackComponent } from './earning-card/back-side/earning-card-back/earning-card-back.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, ChartPanelComponent, ChatPanelHeaderComponent, ChartsComponent, CountryOrdersComponent, EarningCardComponent, LengendChartComponent, ProfitCardComponent, ProgressSectionComponent, SlideOutComponent, TrafficRevealCardComponent, UserActivityComponent, VisitorsAnalyticsComponent, ChartPanelSummaryComponent, EarningCardBackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharesModule
  ],
})
export class DashboardModule { }
