import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AtService {
  constructor(
    protected http: Http
  ) { }

  public getAtById(id: number): Observable<any> {
    const reqOpt = new MyRequestOptions({'diiId': id});
    // return this.http.get('http://localhost:4200/assets/api/getDiiById.json', reqOpt).map(resp => resp.json());
    return this.http.get('http://localhost:49162/api/dii/getDiiById', reqOpt).map(resp => resp.json());
  }

  public getAtByNoInventaris(noInventaris: string): Observable<any> {
    const reqOpt = new MyRequestOptions({'noInventaris': noInventaris});
    return this.http.get('http://localhost:4200/assets/api/getDiiById.json', reqOpt).map(resp => resp.json());
  }

  public getAtByFpf(fpfId: number, unitKerjaId: number): Observable<any> {
    const reqOpt = new MyRequestOptions({'fpfId': fpfId, 'unitKerjaId': unitKerjaId});
    // return this.http.get('http://localhost:4200/assets/api/getDiiList.json', reqOpt).map(resp => resp.json());
    return this.http.get('http://localhost:49162/api/dii/getAtListByFpf', reqOpt).map(resp => resp.json());
  }
}
