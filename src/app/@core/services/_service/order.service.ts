import { Injectable } from '@angular/core';
import {BasicService} from './basic.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BasicService {
  // private readonly baseUrl = `${environment.apiUrl}product`;

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'order', http);
  }
}
