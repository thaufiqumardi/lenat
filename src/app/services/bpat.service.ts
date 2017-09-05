import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BpatService {
  serverDomain = 'http://localhost:4200/';
  public offset: number;

  local = [
    'http://localhost:4200/assets/api/getBpatList.json',
    'http://localhost:4200/assets/api/getBpatById.json',
    'http://localhost:4200/assets/api/getBpatNumber.json'
  ];
  api = [
    'http://localhost:49162/api/bpat', // get bpat list, post new bpat
    'http://localhost:49162/api/bpat/getBpatById', // get bpat by bpatId
    'http://localhost:49162/api/bpat/getBpatNumber' // get bpat documen number
  ];

  constructor(
    private http: Http
  ) {
    this.offset = 0;
  }

  getBpatList() {
    const reqOpt = new MyRequestOptions({
      'offset': this.offset
    });
    return this.http.get(this.api[0], reqOpt).map(resp => resp.json());
  }

  getBpatById(bpatId: number) {
    const reqOpt = new MyRequestOptions({
      'bpatId': bpatId
    });
    return this.http.get(this.api[1], reqOpt).map(resp => resp.json());
  }

  getBpatNumber(unitKerjaId: number) {
    const reqOpt = new MyRequestOptions({
      'unitKerjaId': unitKerjaId
    });
    return this.http.get(this.api[2], reqOpt).map(resp => resp.json());
  }

  postBpat(bpat: any) {
    const reqOpt = new MyRequestOptions();
    return this.http.post(this.api[0], bpat, reqOpt).map(resp => resp.json());
  }
}

export class Bpat {
  bpatId: number;
  noBpat: string;
  tanggalBpat: Date | string;
  lokasiNomorRuangan: string;
  penanggungJawab: string;
  bpatStatusId: number;

  fpfIdPemberi: number;
  nikFpfPemberi: string;
  namaFpfPemberi: string;
  fpfIdPenerima: number;
  nikFpfPenerima: string;
  namaFpfPenerima: string;

  unitKerjaIdPemberi: number;
  kodeUnitKerjaPemberi: string;
  namaUnitKerjaPemberi: string;
  unitKerjaIdPenerima: number;
  kodeUnitKerjaPenerima: string;
  namaUnitKerjaPenerima: string;

  kaIdPemberi: number;
  nikKaPemberi: string;
  namaKaPemberi: string;
  kaIdPenerima: number;
  nikKaPenerima: string;
  namaKaPenerima: string;

  apprKaPemberi: number;
  apprKaPenerima: number;

  bpatDetail: Array<any>;
}
