import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActionTableComponent } from '../action-table/action-table.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayModal: boolean;

  position: string;

  productDialog: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;


  constructor(private productService: ProductService, 
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      console.log(this.products);
    });
  }

  processCreate(): void {
    const dialogRef = this.dialog.open(ActionTableComponent, {
      width: '1200px',
    });
    dialogRef.componentInstance.action = true;

    dialogRef.afterClosed().subscribe(result => {
      this.product = result;
    });
  }

  processEdit(product: any) {
    const dialogRef = this.dialog.open(ActionTableComponent, {
      width: '1200px',
      data: this.products
    });
    dialogRef.componentInstance.action = false; 
    dialogRef.componentInstance.product = product;
    
    dialogRef.afterClosed().subscribe(result => {
      this.product = result;
    });
  }
}
