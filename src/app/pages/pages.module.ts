import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PortletModule} from "../shares/portlet/portlet.module";
import {TooltipModule} from "primeng/tooltip";
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { RouterModule, Routes } from '@angular/router';


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
    },
    {
      path: 'users',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./table/table.module').then(m => m.TableModule),
    },
    {
      path: 'foods',
      loadChildren: () => import('./food/food.module').then(m => m.FoodModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
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
    PagesComponent
  ],
})
export class PagesModule {
}
