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
