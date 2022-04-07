import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';

@Component({
  selector: 'ngx-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {

  formCategory: FormGroup;
  formBrand: FormGroup;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initFormCategories();
    this.initFormBrand();
  }

  initFormCategories() {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      parent_id: [1]
    });
  }

  initFormBrand() {
    this.formBrand = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() {
    return this.formCategory.controls;
  }

  processSaveCategories() {
    if (this.formCategory.valid) {
        this.productService.createCategories(this.formCategory.value).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
          });
     
    }
  }

  processSaveBrand() {
    if (this.formBrand.valid) {
      this.productService.createBrands(this.formBrand.value).subscribe(
        data => {
          this.toastr.success('Thêm mới thành công');
        });
   
  }
  }
}
