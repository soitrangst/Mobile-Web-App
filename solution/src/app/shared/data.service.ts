import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"




@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };



  private readonly JWT_TOKEN: string = "JWT";

  private apiProducts: string = 'http://192.168.1.6:8800/products'

  private apiRegister: string = 'http://192.168.1.6:8800/admin/signup'

  private apiLogin: string = 'http://192.168.1.6:8800/admin/login'


  createProduct(product: any): Observable<any> {
    console.log(product)
    return this.httpClient.post<any>(this.apiProducts, product)
  }

  register(data: any): Observable<any> {
    return this.httpClient.post<FormData>(this.apiRegister, data)
      .pipe(
        catchError(this.handleError)
      )
  }


  isLogin: boolean = false

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiLogin, data)
      .pipe(
        tap(tokens => { this.goLogin(tokens.token), this.isLogin = true }),
        catchError(this.handleError)
      )
  }

  goLogin(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token)
  }

  doLogout() {
    localStorage.removeItem(this.JWT_TOKEN)
  }
  getToken() {
    return localStorage.getItem(this.JWT_TOKEN)
  }
}
