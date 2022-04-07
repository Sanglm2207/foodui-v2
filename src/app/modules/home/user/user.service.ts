import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../@core/models/user.model';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${environment.apiUrl}user`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/getAllUser', httpOptions);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/getUser/' + id, httpOptions);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/createUser', user)
  }
}
