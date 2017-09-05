import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDateModel } from 'mydatepicker';

import { AppService } from 'app/services/app.service';
import { BppatService, Bppat, BppatDetail } from 'app/services/bppat.service';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { AtService } from 'app/services/at.service';

@Component({
  templateUrl: 'bppat-form.component.html',
  providers: [UserService, AtService]
})

export class BppatNewComponent implements OnInit {
  subtitle = 'Peminjaman Baru';
  bppat: Bppat;
  optionUnitKerjaPemberi: Array<any> = [];
  tableData: Array<any> = [];
  allAtData: Array<any> = [];
  totalSelected = 0;

  loadingBox1: boolean;
  loadingBox2: boolean;
  loadingBox3: boolean;
  loadingAll: boolean;

  // mydatepicker
  dpTanggalPeminjaman: Object;
  dpRencanaKembali: Object;

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private appServ: AppService,
    private bppatService: BppatService,
    private authServ: AuthService,
    private userService: UserService,
    private atServ: AtService
  ) {}

  ngOnInit() {
    this.loadingBox1 = true;
    const activeUser = this.authServ.activeUser;
    const activeRole = this.authServ.getActiveRole();
    /* init default values */
    this.bppat = new Bppat();
    this.bppat.userIdFpfPeminjam = activeUser.userId;
    this.bppat.nikFpfPeminjam = activeUser.nik;
    this.bppat.namaFpfPeminjam = activeUser.nama;
    this.bppat.jenisBppat = 1; // peminjaman
    this.bppat.bppatStatusId = 1; // published
    this.bppat.apprKaPemberi1 = 0;
    this.bppat.apprKaPeminjam1 = 0;
    /* init unitkerja peminjam dan kepalanya */
    this.userService.getUnitKerjaById(activeRole.unitKerjaId).subscribe(
      resp => {
        const data = resp.data[0];
        this.bppat.unitKerjaIdPeminjam = data.unitKerjaId;
        this.bppat.kodeUnitKerjaPeminjam = data.kodeUnitKerja;
        this.bppat.namaUnitKerjaPeminjam = data.namaUnitKerja;
        const kepala = data.kepala[0];
        this.bppat.userIdKaPeminjam1 = kepala.userId;
        this.bppat.nikKaPeminjam1 = kepala.nik;
        this.bppat.namaKaPeminjam1 = kepala.nama;
      },
      error => {
        this.appServ.errorHandler(error);
        this.onBtnBatalClick();
      }
    );
    /* init no.bppat */
    this.bppatService.getBppatNumber(activeRole.unitKerjaId).subscribe(
      resp => {
        if (resp.status !== 200) {
          this.appServ.errorHandler(resp);
          this.onBtnBatalClick();
        }
        this.bppat.noBppat = resp.data;
        this.loadingBox1 = false;
      },
      error => {
        this.appServ.errorHandler(error);
        this.onBtnBatalClick();
      }
    );
    /* init tanggal peminjaman default value today */
    const today = new Date();
    this.dpTanggalPeminjaman = {
      date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }
    };
    this.bppat.tanggalPeminjaman = today.toDateString();
  }

  onBtnBatalClick(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onRencanaKembaliChanged(event: IMyDateModel): void {
    this.bppat.rencanaKembali = event.jsdate.toDateString();
  }

  onTanggalPeminjamanChanged(event: IMyDateModel): void {
    this.bppat.tanggalPeminjaman = event.jsdate.toDateString();
  }

  /**
   * Callback on button search nik clicked.
   * Find FPF data by NIK.
   * @param nikFpf
   */
  onBtnSearchNikClick(nikFpf: string): void {
    if (nikFpf.trim() === '') {
      return;
    }
    this.loadingBox2 = true;

    /* clear all fpf pemberi datas */
    this.bppat.userIdFpfPemberi = null;
    this.bppat.namaFpfPemberi = null;
    this.bppat.unitKerjaIdPemberi = null;
    this.bppat.kodeUnitKerjaPemberi = null;
    this.bppat.namaUnitKerjaPemberi = null;
    this.bppat.namaKaPemberi1 = null;
    this.bppat.nikKaPemberi1 = null;
    this.bppat.userIdKaPemberi1 = null;
    this.allAtData = [];
    this.tableData = [];

    /* find fpf data by nik */
    this.userService.getFpfByNik(nikFpf).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('warning', `FPF dengan NIK ${nikFpf} tidak ditemukan`);
          this.loadingBox2 = false;
          return;
        }
        this.bppat.userIdFpfPemberi = resp.data[0].userId;
        this.bppat.nikFpfPemberi = resp.data[0].nik;
        this.bppat.namaFpfPemberi = resp.data[0].nama;
        this.optionUnitKerjaPemberi = resp.data[0].unitKerja;
        this.loadingBox2 = false;
      },
      error => {
        this.appServ.errorHandler(error);
        this.loadingBox2 = false;
      }
    );
  }

  /**
   * Callback on <select> Unit Kerja changed
   * Find Unit Kerja data by selected Unit Kerja
   * @param unitKerjaId
   */
  onUnitKerjaPemberiChange(unitKerjaId: number): void {
    this.loadingBox2 = true;

    /* clear all unit kerja datas, also it's chief and at data */
    this.bppat.unitKerjaIdPemberi = null;
    this.bppat.namaUnitKerjaPemberi = null;
    this.bppat.kodeUnitKerjaPemberi = null;
    this.bppat.userIdKaPemberi1 = null;
    this.bppat.nikKaPemberi1 = null;
    this.bppat.namaKaPemberi1 = null;
    this.allAtData = [];
    this.tableData = [];

    /* get all unit kerja datas by unitKerjaId */
    this.userService.getUnitKerjaById(unitKerjaId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('danger', 'Fatal error: Data unit kerja tidak ditemukan.');
          this.loadingBox2 = false;
          return;
        }
        /* init unit kerja pemberi */
        const data = resp.data[0];
        this.bppat.unitKerjaIdPemberi = data.unitKerjaId;
        this.bppat.kodeUnitKerjaPemberi = data.kodeUnitKerja;
        this.bppat.namaUnitKerjaPemberi = data.namaUnitKerja;
        /* init kepala unit kerja pemberi */
        if (data.kepala.length === 0 || data.kepala == '') {
          this.appServ.showAlert('danger', `Kepala unit kerja ${data.namaUnitKerja} belum diketahui`);
          this.loadingBox2 = false;
          return;
        }
        const kepala = data.kepala[0];
        this.bppat.userIdKaPemberi1 = kepala.userId;
        this.bppat.nikKaPemberi1 = kepala.nik;
        this.bppat.namaKaPemberi1 = kepala.nama;
        this.loadingBox2 = false;
        /* get at data by selected fpf & unit kerja */
        this.loadAtData();
      },
      error => {
        this.appServ.errorHandler(error);
        this.loadingBox2 = false;
      }
    );
  }

  /**
   * Get All AT data by selected FPF + Unit Kerja (Pemberi)
   */
  loadAtData(): void {
    this.loadingBox3 = true;
    /* clear at data */
    this.allAtData = [];
    this.tableData = [];
    /* get at data by selected fpf & unit kerja */
    const userIdFpf = this.bppat.userIdFpfPemberi;
    const unitKerjaId = this.bppat.unitKerjaIdPemberi;
    this.atServ.getAtByFpf(userIdFpf, unitKerjaId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('warning', `Data aktiva tetap FPF ${this.bppat.namaFpfPemberi} unit kerja ${this.bppat.namaUnitKerjaPemberi} masih kosong.`);
          this.loadingBox3 = false;
          return;
        }
        this.allAtData = resp.data;
        this.loadingBox3 = false;
        this.setTableData(0);
      },
      error => {
        this.appServ.errorHandler(error);
        this.loadingBox3 = false;
      }
    );
  }

  /**
   * Show 10 AT datas by selected page
   * @param offset
   */
  setTableData(offset: number): void {
    this.loadingBox3 = true;
    const start = offset;
    const end = offset + 10;
    this.tableData = this.allAtData.slice(start, end);
    this.loadingBox3 = false;
  }

  /**
   * Callback function on row at tableData selected
   * Passing selected AT data to allAtData
   * @param row
   */
  onRowClick(row): void {
    row.selected = row.selected === true ? false : true;
    this.allAtData.find(x => x.diiId === row.diiId).selected = row.selected;
    if (row.selected) {
      this.totalSelected++;
    } else {
      this.totalSelected--;
    }
  }

  /**
   * Callback on page changed
   * @param offset
   */
  onPaginationClick(offset: number): void {
    this.setTableData(offset);
  }

  onBtnKirimClick(): void {
    this.loadingAll = true;
    this.bppat.bppatDetail = this.allAtData.filter(x => x.selected === true);
    this.bppat.bppatDetail.forEach(bppatDetail => {
      bppatDetail.kondisiPinjam = bppatDetail.kondisi;
    });
    // console.log(this.bppat);
    this.bppatService.postBppat(this.bppat).subscribe(
      resp => {
        if (resp.status !== 200) {
          this.appServ.showAlert('danger', 'Maaf, data tidak dapat disimpan. Mohon diperiksa kembali.');
          this.loadingAll = false;
          return;
        }
        this.appServ.showAlert('success', 'Data BPPAT (Peminjaman) baru berhasil dikirim.');
        const bppatId = resp.data;
        this.router.navigate(['../', bppatId], {relativeTo: this.activatedRoute});
      },
      error => {
        this.appServ.errorHandler(error);
        this.loadingAll = false;
      }
    );
  }
}
