import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<any>(this.baseUrl + 'getAnalysisOrder').pipe(
      map(data => {
        const result = []
        data.forEach(v => {
          result.push({
            name: v.month,
            value: v.totalPrice
          });
        })
        return result;
      })
     )
  }

  getTotalPriceByCustomer() {
    return this.http.get<any>(this.baseUrl + 'getTotalPriceByCustomer');
  }

}
