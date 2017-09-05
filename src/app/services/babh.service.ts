import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyRequestOptions } from './my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CanActivate } from '@angular/router';

@Injectable()
export class BabhService implements CanActivate {
  offset: number;

  local = [
    'http://localhost:4200/assets/api/getBabhList.json',
    'http://localhost:4200/assets/api/getBabhById.json',
    'http://localhost:4200/assets/api/getBabhNumber.json',
  ];

  api = [
    'http://localhost:49162/api/babh',
    'http://localhost:49162/api/babh/getBabhById',
    'http://localhost:49162/api/babh/getBabhNumber',
  ];

  constructor(
    private http: Http
  ) {
    console.log('::: BabhService is running');
    this.offset = 0;
  }

  getBabhList() {
    const reqOpt = new MyRequestOptions({
      'offset': this.offset
    });
    return this.http.get(this.api[0], reqOpt).map(resp => resp.json());
  }

  getBabhById(babhId: number) {
    const reqOpt = new MyRequestOptions({
      'babhId': babhId
    });
    return this.http.get(this.api[1], reqOpt).map(resp => resp.json());
  }

  getBabhNumber(unitKerjaId?: number) {
    const reqOpt = new MyRequestOptions({
      'unitKerjaId': unitKerjaId
    });
    return this.http.get(this.api[2], reqOpt).map(resp => resp.json());
  }

  postBabh(babh: any) {
    const reqOpt = new MyRequestOptions();
    return this.http.post(this.api[0], babh, reqOpt).map(resp => resp.json());
  }

  canActivate() {
    console.log('babhService canActivated loaded');
    this.offset = 0;
    return true;
  }
}

export class Babh {
  tanggalBabh: Date;
  noBabh: string;
  nama: string;
  ktp: string;
  nik: string;
  alamat: string;
  laporan: string;
  lokasiHilang: string;
  tanggalHilang: Date;

  babhId: number;
  createdDate: Date;
  fpfId: number;
  nikFpf: string;
  namaFpf: string;
}
