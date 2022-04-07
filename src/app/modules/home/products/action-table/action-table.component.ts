import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'ngx-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss']
})
export class ActionTableComponent implements OnInit {

  @Input() action: any;
  @Input() product: any;
  isSubmitted: boolean = false;
  formProduct: FormGroup;
  lstCategories: any;
  
  constructor(public dialogRef: MatDialogRef<ActionTableComponent>,
              private fb: FormBuilder,
              private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCategories();
    
  }

 

  getAllCategories() {
    this.productService.getAllCategoryProducts().subscribe( res => {
      this.lstCategories = res.data;
      console.log(this.lstCategories);
    })
  }

  initForm() {
    if (this.action) {
      this.formProduct = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        main_image: ["https://firebasestorage.googleapis.com/v0/b/food-v2.appspot.com/o/107043452_2652387545088968_6274293042110235110_n.jpg"],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        category_id: ['', Validators.required]
      });
    
    } else {
      this.formProduct = this.fb.group({
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        description: [this.product.description],
        price: [this.product.price, Validators.required],
        main_image: ["https://firebasestorage.googleapis.com/v0/b/food-v2.appspot.com/o/107043452_2652387545088968_6274293042110235110_n.jpg"],
        quantity: [this.product.quantity, Validators.required],
        category_id: [this.product.category_id, Validators.required]
      });
    }
  }

  get f() {
    return this.formProduct.controls;
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.formProduct.valid) {
      if (this.action) {
        this.productService.createProduct(this.formProduct.value).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
            this.close();
          });
      }
      else {
        this.productService.editProduct(this.formProduct.value, this.product.id).subscribe(data => {
          this.toastr.success('Cập nhật thành công !');
          this.close();
        })
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
