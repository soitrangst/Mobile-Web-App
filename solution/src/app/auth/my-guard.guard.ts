import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from "../shared/data.service"

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
  constructor(private DataService: DataService,
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checking();
  }

  checking():boolean {
    if (this.DataService.isLogin) {
      return true
    }
    this.router.navigate(['admin/login'])
    return false
  }

}
