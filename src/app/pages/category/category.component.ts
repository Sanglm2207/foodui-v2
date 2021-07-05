import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Category } from '../../@core/_config/_models/category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayModal: boolean;

  position: string;

  categoryDialog: boolean;

  categories: Category[];

  category: Category;

  selectedCategories: Category[];

  submitted: boolean;

  stateOptions: any[];

  constructor(private categoryService: CategoryService,
              private primengConfig: PrimeNGConfig,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  
  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(category.id).subscribe(data => {
          this.toastr.success("Deleted table successfully!")
          this.getAllCategories();
        })
      }
    });
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;

    if (this.category.name.trim()) {
        if (this.category.id) {
            this.categories[this.findIndexById(this.category.id)] = this.category;
            this.categoryService.editCategory(this.category, this.category.id).subscribe(data => {
              this.toastr.success('Category update successfully !');
              this.getAllCategories();
              this.displayModal = false;
            }
          );
        }
        else {
          this.categoryService.createCategory(this.category).subscribe(
            data => {
              this.toastr.success('Category create successfully !');
              this.getAllCategories();
              this.displayModal = false;
            }
          );
        }
        this.categories = [...this.categories];
        this.categoryDialog = false;
        this.category = {};
  }

}

findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
          index = i;
          break;
      }
  }
  return index;
}
}
