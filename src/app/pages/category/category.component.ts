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
    this.categoryService.createCategory(this.category)
      .subscribe(
        data => {
          this.toastr.success('Thêm mới thành công');
          this.getAllCategories();
          this.displayModal = false;
        },
        error => {
          console.log(error);
          this.toastr.error('Thêm mới thất bại !');
        }
      );
  }
}
