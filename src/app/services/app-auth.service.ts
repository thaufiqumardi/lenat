import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class AppAuthService {

  private indexRoleActive = 0;
  private userActive = {
    userId: 2,
    nama: 'Jajat Ismail',
    nik: '1231230',
    roles: [
      {
        roleId: 1,
        roleName: 'FPF',
        unitKerjaId: 241,
        kodeUnitKerja: 'LM-2',
        namaUnitKerja: 'Bagian Sistem Informasi'
      },
      {
        roleId: 2,
        roleName: 'Kepala FPF',
        unitKerjaId: 241,
        kodeUnitKerja: 'LM-2',
        namaUnitKerja: 'Bagian Sistem Informasi'
      },
      {
        roleId: 3,
        roleName: 'Admin GA',
        unitKerjaId: 222,
        kodeUnitKerja: 'LH-2',
        namaUnitKerja: 'Bagian Urusan Umum'
      },
      {
        roleId: 4,
        roleName: 'Kepala Unit GA',
        unitKerjaId: 222,
        kodeUnitKerja: 'LH-2',
        namaUnitKerja: 'Bagian Urusan Umum'
      },
      {
        roleId: 5,
        roleName: 'Logistik',
        unitKerjaId: 235,
        kodeUnitKerja: 'LG',
        namaUnitKerja: 'Divisi Logistik'
      },
      {
        roleId: 6,
        roleName: 'Kepala Unit Logistik',
        unitKerjaId: 236,
        kodeUnitKerja: 'LG-1',
        namaUnitKerja: 'Bagian Pengadaan Dalam Negeri'
      },
      {
        roleId: 7,
        roleName: 'Admin Sisfo',
        unitKerjaId: 241,
        kodeUnitKerja: 'LM-2',
        namaUnitKerja: 'Bagian Sistem Informasi'
      },
      {
        roleId: 8,
        roleName: 'Kepala Unit Logistik',
        unitKerjaId: 237,
        kodeUnitKerja: 'LG-2',
        namaUnitKerja: 'Bagian Pengadaan Luar Negeri'
      },
    ]
  };

  constructor() {
    console.log('AppAuthService is running');
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.userActive = null;
  }

  getActiveRole(): Role {
    return this.userActive.roles[this.indexRoleActive];
  }

  getActiveUser(): User {
    return this.userActive;
  }
}

export class User {
  userId: number;
  nama: string;
  nik: string;
  roles: Array<Role>;
}

export class Role {
  roleId: number;
  roleName: string;
  unitKerjaId: number;
  kodeUnitKerja: string;
  namaUnitKerja: string;
}
