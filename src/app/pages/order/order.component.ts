import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Order } from '../../@core/_config/_models/order.model';
import { OrderService } from './order.service';

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

  constructor(private primengConfig: PrimeNGConfig,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllOrders();
  }

  public getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
      
    }, error => {
      console.log(error);
    });
  }

}
