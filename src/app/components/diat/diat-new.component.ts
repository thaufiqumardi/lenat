import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AuthService } from 'app/services/auth.service';
import { DiatService } from 'app/services/diat.service';
import { Diat } from 'app/types/diat';
import { AtService } from 'app/services/at.service';
import { UserService } from 'app/services/user.service';

@Component({
  templateUrl: 'diat-form.component.html',
  providers: [AtService, UserService]
})

export class DiatNewComponent implements OnInit {
  private bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  diat: Diat;
  allAtData: Array<any>;
  tableData: Array<any>;
  totalSelected = 0;

  prosessing: boolean;

  constructor(
    private appServ: AppService,
    private authServ: AuthService,
    private diatServ: DiatService,
    private atServ: AtService,
    private userServ: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.prosessing = true;

    const activeUser = this.authServ.activeUser;
    const activeRole = this.authServ.getActiveRole();

    if (activeRole.roleId != 1) {
      this.appServ.showAlert('warning', 'Maaf, saat ini anda bukan sebagai Pemelihara Fasilitas. Anda tidak diizinkan membuat DIAT.');
      window.history.back();
    }

    this.allAtData = [];
    this.diat = new Diat();
    this.diat.fpfId = activeUser.userId;
    this.diat.nikFpf = activeUser.nik;
    this.diat.namaFpf = activeUser.nama;
    this.diat.apprKaUnitKerja = 0;
    this.diat.diatStatusId = 1;

    const today = new Date();
    this.diat.periode = this.bulan[today.getMonth()] + ' ' + today.getFullYear();
    this.diat.tanggalDiat = today.toDateString();

    /* get all AT datas */
    this.atServ.getAtByFpf(activeUser.userId, activeRole.unitKerjaId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('warning', `Data aktiva tetap Anda masih kosong.`);
        } else {
          this.allAtData = resp.data;
          this.initTableData(0);
        }
      },
      error => {
        this.appServ.showAlert('danger', error);
        // window.history.back();
      }
    );

    this.userServ.getUnitKerjaById(activeRole.unitKerjaId).subscribe(
      resp => {
        const data = resp.data[0];
        this.diat.unitKerjaId = data.unitKerjaId;
        this.diat.kodeUnitKerja = data.kodeUnitKerja;
        this.diat.namaUnitKerja = data.namaUnitKerja;
        const kepala = data.kepala[0];
        this.diat.userIdKaUnitKerja = kepala.userId;
        this.diat.nikKaUnitKerja = kepala.nik;
        this.diat.namaKaUnitKerja = kepala.nama;
      },
      error => {
        this.appServ.showAlert('danger', error);
        window.history.back();
      }
    );
  }

  initTableData(offset: number): void {
    this.prosessing = true;
    const start = offset;
    const end = offset + 10;
    this.tableData = this.allAtData.slice(start, end);
    this.prosessing = false;
  }

  onRowClick(row, event): void {
    if (event.target.tagName === 'SELECT') {
      return;
    }
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
    this.prosessing = true;

    this.diat.diatDetail = this.allAtData.filter(x => x.selected === true);
    this.diat.diatStatusId = 1;
    this.diatServ.postDiat(this.diat).subscribe(
      resp => {
        if (resp.status === 200) { // sukses
          this.appServ.showAlert('success', 'DIAT berhasil dikirim. Status DIAT: Menunggu persetujuan Kepala Unit.');
          const diatId = resp.data;
          this.router.navigate(['../', diatId], { relativeTo: this.activatedRoute });
        } else {
          console.log(resp);
        }
        this.prosessing = false;
      },
      error => {
        this.appServ.errorHandler(error);
        this.prosessing = false;
      }
    );
  }
}
