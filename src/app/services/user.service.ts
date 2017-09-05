import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  serverDomain = "http://localhost:4200/assets/api/";

  constructor(private http: Http) { }
  
  getFpfByNik(nik: string) {
    const opt = {
      search: { 'nik': nik }
    };
    return this.http.get(this.serverDomain + 'getFpfByNik.json', opt).map(resp => resp.json());
  }

  getKepalaByUnitKerjaId(id: number) {
    const opt = {
      search: { 'unitKerjaId': id }
    };
    return this.http.get(this.serverDomain + 'getKepalaByUnitKerjaId.json', opt).map(resp => resp.json());
  }

  getUnitKerjaById(id: number) {
    const opt = {
      search: { 'unitKerjaId': id }
    };
    return this.http.get(this.serverDomain + 'getUnitKerjaById.json', opt).map(resp => resp.json());
  }
}