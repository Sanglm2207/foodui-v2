import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'AuthUser';


@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private cookie: CookieService,
  ) {
  }

  getToken() {
    return this.cookie.get(TOKEN_KEY);
  }

  setToken(token: string) {
    this.cookie.delete(TOKEN_KEY);
    this.cookie.set(TOKEN_KEY, token);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    this.cookie.delete(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
