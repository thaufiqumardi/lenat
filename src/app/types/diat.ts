export class Diat {
  diatId: number;
  createdDate: Date;
  tanggalDiat: string;
  noDiat: string;
  periode: string;
  lokasiNomorRuangan: string;
  penanggungJawab: string;

  unitKerjaId: number;
  kodeUnitKerja: string;
  namaUnitKerja: string;

  userIdKaUnitKerja: number;
  nikKaUnitKerja: string;
  namaKaUnitKerja: string;
  apprKaUnitKerja: number;

  fpfId: number;
  nikFpf: string;
  namaFpf: string;

  diatStatusId: number;
  diatDetail: Array<any>;
}

export class DiatDetail {
  diiId: number;
  namaAktivaTetap: string;
  namaMerk: string;
  namaTipe: string;
  noInvLama: string;
  noInvBaru: string;
  noDpat: string;
  tahunBeli: number;
  kondisi: string;
  status: string;
  keterangan: string;
}
