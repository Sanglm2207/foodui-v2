import { Category } from "./category.model";

export class Food{
    id?: number;
    name?: string;
    imageURL?: string;
    description?: string;
    price?: number;
    category?: Category;
    status?: boolean;
}