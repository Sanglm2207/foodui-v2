import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from './@core/services/_service/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full'},
  { path: '**', redirectTo: 'error/404' },
];

const config: ExtraOptions = {
  useHash: true,
  preloadingStrategy: PreloadAllModules,
  relativeLinkResolution: 'legacy' 

};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
