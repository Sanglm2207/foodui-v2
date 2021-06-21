import {Injectable} from '@angular/core';
import {BasicService} from './basic.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OptionToppingService extends BasicService {

  constructor(
    public http: HttpClient,
  ) {
    super('baseUrl', 'options.topping', http);
  }
}
