import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengModule } from '../../../shared/primeng.module';
import { ProductService } from './product.service';

//angular material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../shared/material.module';
import { ActionTableComponent } from './action-table/action-table.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'add-categories',
        component: CreateCategoriesComponent
      }
    ]
  }
  
]

@NgModule({
  declarations: [
    ProductsComponent,
    ActionTableComponent,
    CreateCategoriesComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [ProductService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
