import { Category } from "./category.model";

export class Food{
    id?: number;
    name?: string;
    imageUrl?: string;
    description?: string;
    quantity?: number;
    price?: number;
    category?: Category;
}