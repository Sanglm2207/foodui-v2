import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../@core/utils/category';
import { CategoryService } from '../../category/category.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'ngx-action-food',
  templateUrl: './action-food.component.html',
  styleUrls: ['./action-food.component.scss']
})
export class ActionFoodComponent implements OnInit {

  @Input() action: any;
  @Input() food: any;
  isSubmitted: boolean = false;
  formFood: FormGroup;
  categories: Category[];
  lstFood: any[] = [];

  constructor(private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private foodService: FoodService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCategories();
  }

  initForm() {
    if (this.action) {
      this.formFood = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        imageURL: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        status: [true, Validators.required],
      });
    } else {
      this.formFood = this.fb.group({
        id: [this.food.id],
        name: [this.food.name, Validators.required],
        description: [this.food.description, Validators.required],
        imageURL: [this.food.imageUrl, Validators.required],
        price: [this.food.price, Validators.required],
        category: [this.food.category.id, Validators.required],
        status: [this.food.status, Validators.required],
      });
    }
  }

  close(status = true) {
    this.modal.close(status);
  }

  get f() {
    return this.formFood.controls;
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.formFood.valid) {
      this.spinner.show();
    
      const categoryObject = this.categories.find(data  => data.id === this.formFood.value.category);
      const data = {...this.formFood.value, ...{category: categoryObject}};
      
      if (this.action) {
        this.foodService.createFood(data).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
            this.close();
          });
      }
      else {
        
          this.foodService.editFood(data, this.food.id).subscribe(data => {
            this.toastr.success('Cập nhật thành công !');
            this.close();
          })
      }
    }
  }

  findAllFood() {
    this.foodService.getAllFoods().subscribe(res => {
      this.lstFood = res;
    });
  }

  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }


}
