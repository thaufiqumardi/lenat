import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from 'app/services/auth.service';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserResolve implements Resolve<any> {
  constructor(
    private http: Http, // ---
    private authServ: AuthService,
    private router: Router // ---
  ) { }

  resolve() {
    console.log('UserResolve started');
    return this.authServ.getUserByToken();
  }
}
