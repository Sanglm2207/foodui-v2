import { Customer } from "./customer.model";

export class Order {
    id?: number;
    discount?: number;
    totalPrice?: number;
    orderTime?: number;
    customer: Customer;
}