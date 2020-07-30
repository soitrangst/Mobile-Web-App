import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  public JWT_TOKEN: string = 'JWT';

  apiProducts: string = 'http://localhost:8800/products';

  apiRegister: string = 'http://localhost:8800/admin/signup';

  apiLogin: string = 'http://localhost:8800/admin/login';

  getData(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiProducts)
      .pipe(tap((result) => result));
  }

  createProduct(product: any): Observable<any> {
    return this.httpClient.post<any>(this.apiProducts, product);
  }

  register(data: any): Observable<any> {
    return this.httpClient.post<FormData>(this.apiRegister, data);
  }

  isLogin: boolean = false;

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiLogin, data).pipe(
      tap((tokens) => {
        this.goLogin(tokens.token), (this.isLogin = true);
      })
    );
  }

  goLogin(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  doLogout() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
