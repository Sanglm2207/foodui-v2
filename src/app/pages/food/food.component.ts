import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from '../../@core/_config/_models/category.model';
import { Food } from '../../@core/_config/_models/food.model';
import { CategoryService } from '../category/category.service';
import { FoodService } from './food.service';

@Component({
  selector: 'ngx-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  foodDialog: boolean;

  foods: Food[];

  food: Food;

  selectedFoods: Food[];

  submitted: boolean;

  categories: Category[];

  ref: DynamicDialogRef;

  foodForm: FormGroup;
  
  constructor(private foodService: FoodService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private toastr: ToastrService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFoods();
    this.primengConfig.ripple = true;
    this.getAllCategories();
    //this.initForm();
  }

  // public initForm() {
  //   this.foodForm = new FormGroup({
  //     id: new FormControl(),
  //     name: new FormControl(),
  //     imageURL: new FormControl(),
  //     description: new FormControl(),
  //     price: new FormControl(),
  //     category: new FormGroup({
  //       id: new FormControl(),
  //       name: new FormControl()
  //     }),
  //   });
  // }

  public getAllFoods(): void {
    this.foodService.getAllFoods().subscribe(data => {
      this.foods = data;
    }, error => {
      console.log(error);
    });
  } 

  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }



  openNew() {
    this.food = {};
    this.submitted = false;
    this.foodDialog = true;
  }

  deleteFood(food: Food) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + food.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.foodService.deleteFood(food.id).subscribe(data => {
          this.toastr.success("Deleted table successfully!")
          this.getAllFoods();
        })
      }
    });
  }

  editFood(food: Food) {
    this.food = { ...food };
    this.foodDialog = true;
  }

  hideDialog() {
    this.foodDialog = false;
    this.submitted = false;
  }

  saveFood() {
    this.submitted = true;
      if (this.food.id) {
          this.foods[this.findIndexById(this.food.id)] = this.food;
          this.foodService.editFood(this.food, this.food.id).subscribe(data => {
            this.toastr.success('Food update successfully !');
            this.getAllFoods();
          }, error => {
            this.toastr.error('Food update failed !');
          })
      }
      else {
        this.foodService.createFood(this.food).subscribe(
          data => {
            this.toastr.success('Food created successfully !');
            this.getAllFoods();
          },
          error => {
            console.log(error);
            this.toastr.error('Food create failed !');
          }
        );
      }
      this.foods = [...this.foods];
      this.foodDialog = false;
      this.food = {};
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.foods);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "foods");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.foods.length; i++) {
      if (this.foods[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
