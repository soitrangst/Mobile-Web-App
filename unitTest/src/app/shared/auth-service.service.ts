import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpRequest, HttpEvent, HttpInterceptor } from "@angular/common/http"

import { Observable } from 'rxjs';
import { DataService } from "./data.service"

@Injectable()

export class AuthServiceService implements HttpInterceptor {

  constructor(private DataService: DataService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization:` Bearer ${this.DataService.getToken()}`
    })
    const clone = request.clone({ headers: headers })
    return next.handle(clone);
  }

}
