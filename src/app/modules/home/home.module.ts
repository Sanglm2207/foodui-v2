import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile/profile.component';
import { PrimengModule } from '../../shared/primeng.module';
import { NebularModule } from '../../shared/nebular.module';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
      path: 'product',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule )
    },
    {
      path: 'profile',
      component: ProfileComponent
    }
  
  ],
}];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    NebularModule,
    PrimengModule
  ]
})
export class HomeModule { }
