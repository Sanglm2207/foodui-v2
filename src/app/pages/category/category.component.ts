import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DEFAULT_MODAL_OPTIONS } from '../../@core/app-config';
import { Category } from '../../@core/_config/_models/category.model';
import { ActionCategoryComponent } from './action-category/action-category.component';
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
              private confirmationService: ConfirmationService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  
  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
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

  processEdit(category: any) {
    const modalRef = this.modal.open(ActionCategoryComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.category = category;
    modalRef.result.then(value => {
        if (value) {
          this.getAllCategories();
        }
      },
    );
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionCategoryComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
        if (value) {
          this.getAllCategories();
        }
      },
    );
  }


}
