import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly baseUrl = `${environment.apiUrl}orderDetail/`;
  
  constructor(private http: HttpClient) { }



  getPriceByProduct() {
    return this.http.get<any>(this.baseUrl + 'getPriceByFood');
  }

  getAnalysisOrderByMonth() {
    return this.http.get<any>(this.baseUrl + 'getAnalysisOrder')
  }

}
