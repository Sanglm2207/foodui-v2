import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Table } from './table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private readonly baseUrl = `${environment.apiUrl}table/`;
  
  constructor(private http: HttpClient) { }

  getListTable(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'restaurant-tables');
  }

  deleteTable(id: number): Observable<any[]> {
    return this.http.delete<any>(this.baseUrl + 'deleteTable/' + id);
  }
  
  createTable(table: Table): Observable<Table[]>  {
    return this.http.post<Table[]>(this.baseUrl + 'createTable', table);
  }
}
