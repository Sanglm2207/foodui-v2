import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}auth/`;

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/auth/'], {
      queryParams: {},
    });
  }


  public login(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}signin`, form , httpOptions);
  }
}
