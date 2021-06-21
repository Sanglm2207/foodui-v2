import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CONFIG} from '../../app-config';
import {Observable} from 'rxjs';
import {CommonUtils} from './common-utils.service';

@Injectable({
  providedIn: 'root',
})
export class BasicService {

  public serviceUrl: string;
  public module: string;
  public systemCode: string;
  credentials: any = {};


  constructor(
    systemCode: string,
    module: string,
    public http: HttpClient,
  ) {
    this.systemCode = systemCode;
    this.module = module;
    const API_URL = environment.serverUrl[this.systemCode];
    const API_PATH = CONFIG.API_PATH[this.module];

    this.serviceUrl = API_URL + API_PATH;
  }

  search(data?: any, event?: any): Observable<any> {
    if (!event) {
      this.credentials = Object.assign({}, data);
    }
    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    const buildParams = CommonUtils.buildParams(searchData);
    return this.http.get(`${this.serviceUrl}/search`, {params: buildParams});
  }

  saveOrUpdate(item: any): Observable<any> {
    return this.http.post(this.serviceUrl, CommonUtils.convertFormFile(item));
  }

  /**
   * findOne
   * param id
   */
  public findOne(id: any): Observable<any> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.get(url);
  }

  /**
   * deleteById
   * param id
   */
  public deleteById(id: number): Observable<any> {
    const url = `${this.serviceUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  public findAllData(): Observable<any> {
    const url = `${this.serviceUrl}/find_all`;
    return this.http.get(url);
  }

  public statistical(data: any): Observable<any> {
    const url = `${this.serviceUrl}/statistical`;
    return this.http.post(url, CommonUtils.convertFormFile(data));
  }
}
