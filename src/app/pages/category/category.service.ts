import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../@core/_config/_models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl = `${environment.apiUrl}categories/`;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getAllCategories');
  }

  deleteCategory(id: number): Observable<any[]> {
    return this.http.delete<any>(this.baseUrl + 'deleteCategory/' + id);
  }
  
  createCategory(category: Category): Observable<Category[]>  {
    return this.http.post<Category[]>(this.baseUrl + 'createCategory', category);
  }
}
