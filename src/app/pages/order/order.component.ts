import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Order } from '../../@core/_config/_models/order.model';
import { OrderService } from './order.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  displayModal: boolean;

  position: string;

  orders: Order[];

  order: Order;

  selectedOrders: Order[];


  submitted: boolean;

  exportColumns: any[];

  constructor(private primengConfig: PrimeNGConfig,
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getOrderByCustomer();
  }

  // public getAllOrders(): void {
  //   this.orderService.getAllOrders().subscribe(data => {
  //     this.orders = data;
  //     console.log(this.orders);

  //   }, error => {
  //     console.log(error);
  //   });
  // }

  public getOrderByCustomer(): void {
    this.orderService.getOrderByCustomer().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    })

  }

  exportSelectedProducts() {
    console.log("Clicked");    
    
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.orders = this.orders.filter(val => !this.selectedOrders.includes(val));
            // this.selectedOrders = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.orders);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "orders");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
