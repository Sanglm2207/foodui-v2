import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_MODAL_OPTIONS } from '../../@core/app-config';
import { Category } from '../../@core/_config/_models/category.model';
import { Food } from '../../@core/_config/_models/food.model';
import { CategoryService } from '../category/category.service';
import { ActionFoodComponent } from './action-food/action-food.component';
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


  ref: DynamicDialogRef;

  foodForm: FormGroup;

  constructor(private foodService: FoodService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private toastr: ToastrService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public dialog: MatDialog,
    private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllFoods();
    this.primengConfig.ripple = true;
  }

  public getAllFoods(): void {
    this.foodService.getAllFoods().subscribe(data => {
      this.foods = data;
    }, error => {
      console.log(error);
    });
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

  processEdit(food: any) {
    const modalRef = this.modal.open(ActionFoodComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = false;
    modalRef.componentInstance.food = food;
    modalRef.result.then(value => {
      if (value) {
        this.getAllFoods();
      }
    },
    );
  }

  processSave($event: any) {
    const modalRef = this.modal.open(ActionFoodComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.action = true;
    modalRef.result.then(value => {
      if (value) {
        this.getAllFoods();
      }
    });
  }

}
