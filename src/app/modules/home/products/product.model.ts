export interface Product {
    id?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    category?:string;
    brand?:string;
    image?:string;
    main_image?:string;
}

export interface Categories {
    id?:string;
    name?:string;
    description?:string;
    parent?:number;
}

export interface Brands {
    id?:string;
    name?:string;
    description?:string;
}