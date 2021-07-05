import { Food } from "./food.model";

export class Order {
    id?: number;
    orderTime?: number;
    totalPrice?: number;
    food?: Food;
    status?: Boolean;
    
}