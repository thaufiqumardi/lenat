import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AppAuthService } from 'app/services/app-auth.service';
import { BpatService, Bpat } from 'app/services/bpat.service';
import { UserService } from 'app/services/user.service';
import { AtService } from 'app/services/at.service';

@Component({
  templateUrl: 'bpat-form.component.html',
  providers: [UserService, AtService]
})

export class BpatNewComponent implements OnInit {
  bpat: Bpat;
  optUnitKerjaPenerima: any;
  dpTanggalBpat: Object;
  allAtData: Array<any>;
  tableData: Array<any>;
  totalSelected = 0;

  loadingBox1: boolean;
  loadingBox2: boolean;
  loadingBox3: boolean;

  constructor(
    private appServ: AppService,
    private appAuthService: AppAuthService,
    private bpatService: BpatService,
    private userService: UserService,
    private atService: AtService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadingBox1 = true;
    this.bpat = new Bpat();
    this.allAtData = [];
    const activeUser = this.appAuthService.getActiveUser();
    const activeRole = this.appAuthService.getActiveRole();

    if (activeRole.roleId != 1) {
      this.appServ.showAlert('warning', 'Maaf, saat ini anda bukan sebagai Pemelihara Fasilitas. Anda tidak diizinkan membuat BPAT.');
      window.history.back();
    } else {
      this.bpat.fpfIdPemberi = activeUser.userId;
      this.bpat.nikFpfPemberi = activeUser.nik;
      this.bpat.namaFpfPemberi = activeUser.nama;
    }

    this.userService.getUnitKerjaById(activeRole.unitKerjaId).subscribe(
      resp => {
        const data = resp.data[0];
        this.bpat.unitKerjaIdPemberi = data.unitKerjaId;
        this.bpat.kodeUnitKerjaPemberi = data.kodeUnitKerja;
        this.bpat.namaUnitKerjaPemberi = data.namaUnitKerja;
        const kepala = data.kepala[0];
        this.bpat.kaIdPemberi = kepala.userId;
        this.bpat.nikKaPemberi = kepala.nik;
        this.bpat.namaKaPemberi = kepala.nama;
      },
      error => {
        this.appServ.showAlert('danger', error);
        window.history.back();
      }
    );

    const today = new Date();
    this.dpTanggalBpat = {
      date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }
    };
    this.bpat.tanggalBpat = today.toDateString();

    this.bpatService.getBpatNumber(activeRole.unitKerjaId).subscribe(
      resp => {
        if (resp.data == '') {
          this.appServ.showAlert('danger', 'Server tidak merespon permintaan Nomor BPAT. Coba muat ulang halaman. Atau hubungi Sisfo.');
        } else {
          this.bpat.noBpat = resp.data;
        }
        this.loadingBox1 = false;
      },
      error => {
        this.appServ.showAlert('danger', error);
        window.history.back();
      }
    );

    /* get all AT datas */
    this.loadingBox3 = true;
    this.atService.getAtByFpf(activeUser.userId, activeRole.unitKerjaId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('warning', `Data aktiva tetap FPF ${this.bpat.namaFpfPemberi} unit kerja ${this.bpat.namaUnitKerjaPemberi} masih kosong.`);
        } else {
          this.allAtData = resp.data;
          this.initTableData(0);
        }
      },
      error => {
        this.appServ.showAlert('danger', error);
        window.history.back();
      }
    );
  }

  initTableData(offset: number): void {
    this.loadingBox3 = true;
    const start = offset;
    const end = offset + 10;
    this.tableData = this.allAtData.slice(start, end);
    this.loadingBox3 = false;
  }

  onTanggalBpatChanged(event): void {
    this.bpat.tanggalBpat = event.jsdate.toDateString();
  }

  onBtnSearchNikClick(nik: string): void {
    if (nik === this.bpat.nikFpfPenerima || nik.trim() === '') {
      return;
    }
    this.loadingBox2 = true;
    this.bpat.fpfIdPenerima = null;
    this.bpat.nikFpfPenerima = null;
    this.bpat.namaFpfPenerima = null;
    this.bpat.unitKerjaIdPenerima = null;
    this.bpat.kodeUnitKerjaPenerima = null;
    this.bpat.namaUnitKerjaPenerima = null;

    this.userService.getFpfByNik(nik).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('warning', `Maaf, NIK ${nik} tidak ditemukan dalam data FPF.`);
          this.loadingBox2 = false;
          return;
        }
        const data = resp.data[0];
        this.bpat.fpfIdPenerima = data.userId;
        this.bpat.nikFpfPenerima = data.nik;
        this.bpat.namaFpfPenerima = data.nama;
        this.optUnitKerjaPenerima = data.unitKerja;
        this.loadingBox2 = false;
      },
      error => {
        this.appServ.showAlert('danger', error.statusText);
        this.loadingBox2 = false;
      }
    );
  }

  onUkPenerimaChange(unitKerjaId: number): void {
    this.loadingBox2 = true;
    this.userService.getUnitKerjaById(unitKerjaId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('danger', 'Data Unit Kerja tidak ditemukan.');
          this.loadingBox2 = false;
          return;
        }
        const data = resp.data[0];
        this.bpat.unitKerjaIdPenerima = data.unitKerjaId;
        this.bpat.kodeUnitKerjaPenerima = data.kodeUnitKerja;
        this.bpat.namaUnitKerjaPenerima = data.namaUnitKerja;
        if (data.kepala.length === 0 || data.kepala == '' || data.kepala === undefined) {
          this.appServ.showAlert('danger', `Kepala Unit Kerja ${data.namaUnitKerja} tidak ditemukan.`);
          this.loadingBox2 = false;
          return;
        }
        const kepala = data.kepala[0];
        this.bpat.kaIdPenerima = kepala.userId;
        this.bpat.nikKaPenerima = kepala.nik;
        this.bpat.namaKaPenerima = kepala.nama;
        this.loadingBox2 = false;
      },
      error => {
        this.appServ.showAlert('danger', error.statusText);
        this.loadingBox2 = false;
      }
    );
  }

  onRowClick(row, event): void {
    if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
      return;
    }
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
    this.initTableData(offset);
  }

  onBtnKirimClick() {
    this.loadingBox1 = true;
    this.loadingBox2 = true;
    this.loadingBox3 = true;

    this.bpat.bpatDetail = this.allAtData.filter(x => x.selected === true);
    this.bpat.bpatStatusId = 1;
    this.bpat.apprKaPemberi = 0;
    this.bpat.apprKaPenerima = 0;

    this.bpat.bpatDetail.forEach(detail => {
      detail.noBpat = this.bpat.noBpat;
    });

    let postdata: Array<any> = [this.bpat];
    console.log(postdata);
    this.bpatService.postBpat(postdata).subscribe(
      resp => {
        console.log(resp);
        if (resp.status === 200) { // sukses
          const bpatId = resp.data;
          this.router.navigate(['../', bpatId], { relativeTo: this.activatedRoute });
        } else {
          console.log(resp);
        }
        this.loadingBox1 = false;
        this.loadingBox2 = false;
        this.loadingBox3 = false;
      },
      error => {
        this.appServ.errorHandler(error);
        this.loadingBox1 = false;
        this.loadingBox2 = false;
        this.loadingBox3 = false;
      }
    );
  }
}
