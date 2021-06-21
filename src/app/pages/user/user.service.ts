import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.setting';


const API_URL =  AppSettings.BASE_URL + 'user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getListUser(): Observable<any> {
    return this.http.get<any>(API_URL + 'getAllUser', httpOptions);
  }

  deleteUser(id: number): Observable<any[]> {
    return this.http.delete<any>(API_URL + 'deleteAccount/' + id, httpOptions)
  }
}
