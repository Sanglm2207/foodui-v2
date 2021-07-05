import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { NbAuthModule } from "@nebular/auth";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from './auth.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';

export const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    RouterModule.forChild(routes),
    NbAuthModule,
    NbIconModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSpinnerModule,
    NgxSpinnerModule,
    TranslateModule,
  ],
  declarations: [LoginComponent, AuthComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxAuthModule {}
