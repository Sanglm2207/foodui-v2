import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Food } from '../../@core/_config/_models/food.model';
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

  constructor(private foodService: FoodService,
               private confirmationService: ConfirmationService,
               private primengConfig: PrimeNGConfig,
               private toastr: ToastrService) { }

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
  this.foodService.createFood(this.food)
    .subscribe(
      data => {
        this.toastr.success('Thêm mới thành công');
        this.getAllFoods();
      },
      error => {
        console.log(error);
        this.toastr.error('Thêm mới thất bại !');
      }
    );
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

}
