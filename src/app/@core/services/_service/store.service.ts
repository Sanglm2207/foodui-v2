import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicService} from './basic.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BasicService {

  constructor(public http: HttpClient) {
    super('baseUrl', 'store', http);
  }
}
