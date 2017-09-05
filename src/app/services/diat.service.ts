import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DiatService implements CanActivate {
  serverUrl = 'http://localhost:4200/assets/api/';
  listOffset = 0;

  constructor(private http: Http) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // throw new Error("Method not implemented.");
    console.log(state);
    return true;
  }

  getDiatList(): Observable<any> {
    const reqOpt = new MyRequestOptions({
      'offset': this.listOffset
    });
    return this.http.get('http://localhost:49162/api/diat').map(resp => resp.json());
  }

  getDiatById(diatId: number): Observable<any> {
    const reqOpt = new MyRequestOptions({
      'diatId': diatId
    });
    return this.http.get('http://localhost:49162/api/diat/getDiatById', reqOpt).map(resp => resp.json());
  }

  postDiat(diat: any) {
    const reqOpt = new MyRequestOptions();
    return this.http.post('http://localhost:49162/api/diat', new Array(diat), reqOpt).map(resp => resp.json());
  }
}
