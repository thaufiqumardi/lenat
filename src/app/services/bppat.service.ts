import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyRequestOptions } from 'app/services/my-request-options';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BppatService {
  serverDomain = 'http://localhost:4200/assets/api/';
  offset: number;

  constructor(
    private http: Http
  ) {
    console.log(':: bppat service is running ::');
    this.offset = 0;
  }

  getBppatList(): Observable<any> {
    const reqOpt = new MyRequestOptions({
      'offset': this.offset
    });
    return this.http.get('http://localhost:49162/api/bppat', reqOpt).map(resp => resp.json());
  }

  getBppatById(bppatId) {
    const reqOpt = new MyRequestOptions({
      'bppatId': bppatId
    });
    return this.http.get('http://localhost:49162/api/bppat/getBppatById', reqOpt).map(resp => resp.json());
  }

  getBppatNumber(unitKerjaId) {
    const reqOpt = new MyRequestOptions({
      'unitKerjaId': unitKerjaId
    });
    return this.http.get('http://localhost:49162/api/bppat/getBppatNumber', reqOpt).map(resp => resp.json());
  }

  postBppat(bppat) {
    const reqOpt = new MyRequestOptions();
    return this.http.post('http://localhost:49162/api/bppat', new Array(bppat), reqOpt).map(resp => resp.json());
  }

  putBppat(bppat) {
    const reqOpt = new MyRequestOptions();
    return this.http.put('http://localhost:49162/api/bppat', new Array(bppat), reqOpt).map(resp => resp.json());
  }
}

export class Bppat {
  bppatId: number;
  createdDate: Date;
  tanggalPeminjaman: Date | string;
  tanggalPengembalian: Date | string = null;
  rencanaKembali: Date | string;
  noBppat: string;
  jenisBppat: number;
  namaKegiatan: string;
  kodeKegiatan: string;
  kebutuhan: string;
  unitKerjaIdPeminjam: number;
  unitKerjaIdPemberi: number;
  kodeUnitKerjaPeminjam: string;
  kodeUnitKerjaPemberi: string;
  namaUnitKerjaPeminjam: string;
  namaUnitKerjaPemberi: string;
  userIdFpfPeminjam: number;
  userIdFpfPemberi: number;
  nikFpfPeminjam: string;
  nikFpfPemberi: string;
  namaFpfPeminjam: string;
  namaFpfPemberi: string;
  userIdKaPeminjam1: number;
  userIdKaPemberi1: number;
  nikKaPeminjam1: string;
  nikKaPemberi1: string;
  namaKaPeminjam1: string;
  namaKaPemberi1: string;
  userIdKaPeminjam2: number = null;
  userIdKaPemberi2: number = null;
  nikKaPeminjam2: string = null;
  nikKaPemberi2: string = null;
  namaKaPeminjam2: string = null;
  namaKaPemberi2: string = null;
  apprKaPeminjam1: number = 0;
  apprKaPemberi1: number = 0;
  apprKaPeminjam2: number = null;
  apprKaPemberi2: number = null;
  bppatStatusId: number = 1;
  bppatDetail: Array<BppatDetail | any>;
}

export class BppatDetail {
  diiId: number;
  namaBarang: string;
  namaMerk: string;
  namaTipe: string;
  noSeri: string;
  noInventaris: string;
  kondisiPinjam: string;
  kondisiKembali: string = null;
}
