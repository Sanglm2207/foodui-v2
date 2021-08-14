import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'ngx-action-category',
  templateUrl: './action-category.component.html',
  styleUrls: ['./action-category.component.scss']
})
export class ActionCategoryComponent implements OnInit {

  @Input() action: any;
  @Input() category: any;
  isSubmitted: boolean = false;
  formCategory: FormGroup;
  lstCategory: any[] = [];


  constructor(private modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initForm();
    this.findAll();
  }

  initForm() {
    if (this.action) {
      this.formCategory = this.fb.group({
        name: ['', Validators.required],
        status: [null, Validators.required],
      });
    } else {
      this.formCategory = this.fb.group({
        id: [this.category.id],
        name: [this.category.name, Validators.required],
        status: [this.category.status, Validators.required],

      });
    }
  }

  close(status = true) {
    this.modal.close(status);
  }

  get f() {
    return this.formCategory.controls;
  }


  findAll() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.lstCategory = data;
    });
  }

  processSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.formCategory.valid) {
      this.spinner.show();

      if (this.action) {
        this.categoryService.createCategory(this.formCategory.value).subscribe(
          data => {
            this.toastr.success('Thêm mới thành công');
            this.close();
          });

      }
      else {
        this.categoryService.editCategory(this.formCategory.value, this.category.id).subscribe(data => {
          console.log("Category", this.category);
          
          this.toastr.success('Cập nhật thành công!');
          this.close();
        })
      }

    }
  }

}
