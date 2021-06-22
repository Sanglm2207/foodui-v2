import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../@core/_config/_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${environment.apiUrl}user/`;
  
  constructor(private http: HttpClient) { }

  getListUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getAllUser');
  }

  deleteUser(id: number): Observable<any[]> {
    return this.http.delete<any>(this.baseUrl + 'deleteAccount/' + id)
  }

  createUser(user: User): Observable<User[]>  {
    return this.http.post<User[]>(this.baseUrl + 'createUser', user);
  }
}
