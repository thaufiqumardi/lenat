import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Route, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {

  constructor(
    private http: Http,
    private authServ: AuthService
  ) {
    console.log(':: AuthGuardService is running ::');
  }

  checkLogin(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      this.redirectToLoginForm();
      return false;
    }
  }

  canLoad(route: Route) {
    console.log(':: auth-guard service loaded ::');
    return this.checkLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(':: auth-guard service activated ::');
    return this.checkLogin();
  }

  getLoginUrl(): string {
    // Request URL halaman login yang dibuat oleh Identity Server.
    // untuk mempermudah, request URL biar backend yang handle.
    return 'http://localhost:4200/register';
  }

  redirectToLoginForm() {
    const loginUrl = this.getLoginUrl();
    localStorage.setItem('token', btoa('1')); // sementara
    window.location.href = loginUrl;
  }
}
