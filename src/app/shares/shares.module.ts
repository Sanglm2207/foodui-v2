import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  PortletModule } from './portlet/portlet.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { TrendModule } from 'ngx-trend';

const modules = [
  CommonModule,
  PortletModule,
  TranslateModule,
  NgxSpinnerModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,
  NgxEchartsModule,
  TrendModule,
  MaterialModule,
  PrimengModule,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class SharesModule { }
