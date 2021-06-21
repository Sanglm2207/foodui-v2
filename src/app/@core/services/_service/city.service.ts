import {Injectable} from '@angular/core';
import {BasicService} from './basic.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CityService extends BasicService {

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'city', http);
  }

}
