import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { BppatService, Bppat } from 'app/services/bppat.service';
import { UserService } from 'app/services/user.service';
import { AtService } from 'app/services/at.service';

@Component({
  selector: 'bppat-edit-new',
  templateUrl: 'bppat-form.component.html',
  providers: [UserService, AtService]
})

export class BppatEditNewComponent implements OnChanges {
  static subtitle = 'Ubah';
  @Input() bppat = new Bppat();

  optionUnitKerjaPemberi: Array<any> = [];
  tableData: Array<any> = [];
  allAtData: Array<any> = [];
  totalSelected: number;

  loadingBox1: boolean;
  loadingBox2: boolean;
  loadingBox3: boolean;
  loadingAll: boolean;

  // mydatepicker
  dpTanggalPeminjaman: Object;
  dpRencanaKembali: Object;

  constructor(
    private appServ: AppService,
    private bppatServ: BppatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private atServ: AtService
  ) { }

  ngOnChanges(changes): void {
    this.initComponents();
  }

  initComponents(): void {
    this.loadingBox1 = true;
    /* set mydatepicker components */
    const tanggalPeminjaman = new Date(this.bppat.tanggalPeminjaman.toString());
    const rencanaKembali = new Date(this.bppat.rencanaKembali.toString());
    this.dpTanggalPeminjaman = {
      date: {
        day: tanggalPeminjaman.getDate(),
        month: tanggalPeminjaman.getMonth() + 1,
        year: tanggalPeminjaman.getFullYear(),
      }
    };
    this.dpRencanaKembali = {
      date: {
        day: rencanaKembali.getDate(),
        month: rencanaKembali.getMonth() + 1,
        year: rencanaKembali.getFullYear()
      }
    };
    this.loadingBox1 = false;
    /* set option unit kerja pemberi */
    this.setOptUnitKerjaByFpf(this.bppat.nikFpfPemberi);
    /* get all at datas by current fpfID + unitKerjaId */
    this.getAllAtData(this.bppat.userIdFpfPemberi, this.bppat.unitKerjaIdPemberi);
    this.totalSelected = this.bppat.bppatDetail.length;
  }

  /**
   * Set select's option of unit kerja FPF pemberi
   * @param nikFpf
   */
  setOptUnitKerjaByFpf(nikFpf: string): void {
    this.loadingBox2 = true;
    this.bppat.userIdFpfPemberi = null;
    this.bppat.nikFpfPemberi = null;
    this.bppat.namaFpfPemberi = null;
    this.optionUnitKerjaPemberi = [];
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
        this.appServ.showAlert('danger', error.statusText);
        this.loadingBox2 = false;
      }
    );
  }

  getAllAtData(fpfId: number, unitKerjaId: number): void {
    this.loadingBox3 = true;
    this.allAtData = [];
    this.atServ.getAtByFpf(fpfId, unitKerjaId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('warning', `Data aktiva tetap FPF ${this.bppat.namaFpfPemberi} unit kerja ${this.bppat.namaUnitKerjaPemberi} masih kosong.`);
          this.loadingBox3 = false;
          return;
        }
        this.allAtData = resp.data;
        /* matching data */
        this.bppat.bppatDetail.forEach(at => {
          this.allAtData.find(x => x.diiId == at.diiId).selected = true;
        });
        this.setTableData(0);
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

  onBtnBatalClick(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onTanggalPeminjamanChanged(event): void {
    this.bppat.tanggalPeminjaman = event.jsdate;
  }

  onRencanaKembaliChanged(event): void {
    this.bppat.rencanaKembali = event.jsdate;
  }

  onUnitKerjaPemberiChange(unitKerjaId: number): void {
    this.loadingBox2 = true;
    /* clear all unit kerja datas, also it's chief and at datas */
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
          this.appServ.showAlert('danger', 'Fatal error: Data unit kera tidak ditemukan');
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
        this.getAllAtData(this.bppat.userIdFpfPemberi, this.bppat.unitKerjaIdPemberi);
      },
      error => {
        this.appServ.showAlert('danger', error);
        this.loadingBox2 = false;
      }
    );
  }

  /**
   * Callback on button search nik clicked.
   * Find FPF data by NIK.
   * @param nikFpf
   */
  onBtnSearchNikClick(nikFpf: string): void {
    if (nikFpf.trim() === '' || nikFpf == this.bppat.nikFpfPemberi) {
      return;
    }
    this.loadingBox2 = true;

    /* clear all fpf pemberi datas */
    this.bppat.unitKerjaIdPemberi = null;
    this.bppat.kodeUnitKerjaPemberi = null;
    this.bppat.namaUnitKerjaPemberi = null;
    this.bppat.namaKaPemberi1 = null;
    this.bppat.nikKaPemberi1 = null;
    this.bppat.userIdKaPemberi1 = null;
    this.allAtData = [];
    this.tableData = [];

    this.setOptUnitKerjaByFpf(nikFpf);
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
    this.bppatServ.putBppat(this.bppat).subscribe(
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
