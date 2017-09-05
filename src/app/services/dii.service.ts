import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AtService } from './at.service';
import { MyRequestOptions } from './my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DiiService extends AtService {
  serverDomain = 'http://localhost:4200/assets/api/';

  public tableOffset: number;
  public tableOrderBy: string;
  public tableFilter: any;

  constructor(
    protected http: Http
  ) {
    super(http);
    console.log('DiiService is running');
    this.tableOffset = 0;
  }

  getDiiList() {
    // return this.http.get(this.serverDomain + "getDiiList.json").map(resp=>resp.json());
    const reqOpt = new MyRequestOptions({
      'offset': this.tableOffset
    });
    return this.http.get('http://localhost:49162/api/dii', reqOpt).map(resp => resp.json());
  }

  getAtListByFpf(fpfId: number, unitKerjaId: number) {
    return this.http.get(this.serverDomain + "getDiiList.json").map(resp=>resp.json());
  }
}