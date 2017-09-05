import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'app/types/user';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthService {
  activeUser: User;
  indexActiveRole = 0;

  constructor(
    private http: Http
  ) { }

  getUserByToken(): Observable<any> {
    const reqOpt = new MyRequestOptions();
    return this.http.get('/assets/api/getActiveUser.json', reqOpt).map(resp => resp.json()).first();
  }

  getActiveRole() {
    return this.activeUser.roles[this.indexActiveRole];
  }

  logout() {
    this.activeUser = new User();
    localStorage.clear();
    window.location.href = '';
  }
}
