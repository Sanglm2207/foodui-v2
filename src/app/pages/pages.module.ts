import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import { ProductComponent } from './product/product.component';
import {PortletModule} from "../shares/portlet/portlet.module";
import {TooltipModule} from "primeng/tooltip";
import {TableModule} from "primeng/table";
import { StoreComponent } from './store/store.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer/customer.module')
        .then(m => m.CustomerModule),
    },
    {
      path: 'city',
      loadChildren: () => import('./city/city.module')
        .then(m => m.CityModule),
    },
    {
      path: 'products',
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule),
    },
    {
      path: 'store',
      loadChildren: () => import('./store/store.module')
        .then(m => m.StoreModule),
    },
    {
      path: 'order',
      loadChildren: () => import('./orders/orders.module')
        .then(m => m.OrdersModule),
    },

    // {
    //   path: 'category',
    //   loadChildren: () => import('./category/category.module')
    //     .then(m => m.CategoryModule),
    // },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'error/404',
      component: NotFoundComponent,
    },
    {
      path: '**',
      redirectTo: 'error/404',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        MiscellaneousModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
        PortletModule,
        TooltipModule,
        TableModule,
        ReactiveFormsModule,
        InputTextModule,
    ],
  declarations: [
    PagesComponent,
    ProductComponent,
    StoreComponent,
  ],
})
export class PagesModule {
}
