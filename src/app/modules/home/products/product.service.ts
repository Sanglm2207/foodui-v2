import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Brands, Categories, Product } from './product.model';


@Injectable()
export class ProductService {


    private readonly productAPI = `${environment.apiUrl}products`;
    private readonly categoryAPI = `${environment.apiUrl}categories`;
    private readonly brandAPI = `${environment.apiUrl}brands`;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get<any>(this.productAPI);
    }

    createProduct(product: Product): Observable<Product[]> {
        return this.http.post<Product[]>(this.productAPI, product);
    }


    editProduct(product: Product, id: number): Observable<Product[]> {
        return this.http.put<Product[]>(this.productAPI + "/" +  id, product);
    }

    getAllCategoryProducts(): Observable<any> {
        return this.http.get<any>(this.categoryAPI);
    }

    createCategories(category: Categories): Observable<Categories[]> {
        return this.http.post<Categories[]>(this.categoryAPI, category);
    }

    createBrands(brand: Brands): Observable<Brands[]> {
        return this.http.post<Brands[]>(this.brandAPI, brand);
    }

}