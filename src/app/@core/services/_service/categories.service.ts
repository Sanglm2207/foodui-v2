import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResponse} from '../../utils/data-response';
import {CommonUtils} from './common-utils.service';
import {BasicService} from './basic.service';
import {Category} from '../../utils/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BasicService {
  private readonly baseUrl = `${environment.apiUrl}categories`;

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'categories', http);
  }

  findAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/find_all`);
  }

  deleteCategories(data: any): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append('categories', data[i]);
    }
    return this.http.post(`${this.baseUrl}/delete`, formData);
  }
}
