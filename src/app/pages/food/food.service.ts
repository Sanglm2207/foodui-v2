import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Food } from '../../@core/_config/_models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private readonly baseUrl = `${environment.apiUrl}food/`;
  
  constructor(private http: HttpClient) { }

  getAllFoods(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getAllFoods');
  }

  deleteFood(id: number): Observable<any[]> {
    return this.http.delete<any>(this.baseUrl + 'deleteFood/' + id);
  }
  
  createFood(food: Food): Observable<Food[]>  {
    return this.http.post<Food[]>(this.baseUrl + 'createFood', food);
  }

  editFood(food: Food, id: number): Observable<Food[]> {
    return this.http.put<Food[]>(this.baseUrl + 'editFood/' + id, food);
  }
}
