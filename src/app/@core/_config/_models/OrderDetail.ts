import { Food } from "./food.model";
import { Order } from "./order.model";

export class OrderDetail {
    quantity: number;
    order: Order;
    food: Food;
    price: number;
  
    constructor() {
      this.order = new Order();
      this.food = new Food();
    }
  }
  