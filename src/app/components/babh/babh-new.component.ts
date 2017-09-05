import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AppAuthService } from 'app/services/app-auth.service';
import { BabhService } from 'app/services/babh.service';

@Component({
  templateUrl: 'babh-form.component.html'
})

export class BabhNewComponent implements OnInit {
  subTitle = 'Tambah Baru';
  prosessing = false;
  formBabh: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private appAuthServ: AppAuthService,
    private babhService: BabhService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initForm();
  }

  initForm() {
    this.formBabh = this.formBuilder.group({
      noBabh: '',
      tanggalBabh: null,
      nama: '',
      selectedIdNo: 'nik',
      idNumber: '',
      alamat: '',
      laporan: '',
      lokasiHilang: '',
      tanggalHilang: null
    });
  }

  ngOnInit() {
    this.prosessing = true;
    this.babhService.getBabhNumber().subscribe(
      resp => {
        this.formBabh.patchValue({
          noBabh: resp.data
        });
        this.prosessing = false;
      },
      error => {
        this.prosessing = false;
      }
    );
  }

  onBtnBatalClick() {
    this.location.back();
  }

  onBtnSimpanCLick() {
    const activeUser = this.appAuthServ.getActiveUser();
    const controls = this.formBabh.controls;
    const data = [{
      noBabh: controls.noBabh.value,
      tanggalBabh: controls.tanggalBabh.value.jsdate.toDateString(),
      nama: controls.nama.value,
      ktp: controls.selectedIdNo.value === 'ktp' ? controls.idNumber.value : '',
      nik: controls.selectedIdNo.value === 'nik' ? controls.idNumber.value : '',
      alamat: controls.alamat.value,
      laporan: controls.laporan.value,
      lokasiHilang: controls.lokasiHilang.value,
      tanggalHilang: controls.tanggalHilang.value.jsdate.toDateString(),
      fpfId: activeUser.userId,
      nikFpf: activeUser.nik,
      namaFpf: activeUser.nama,
      babhStatusId: 1
    }];
    console.log(data);
    this.babhService.postBabh(data).subscribe(
      resp => {
        if (resp.status === 200) {
          const babhId = resp.data;
          this.appService.showAlert('success', 'Data BABH baru berhasil dibuat.');
          this.router.navigate(['../', babhId], { relativeTo: this.activatedRoute });
        } else {
          console.log(resp);
          this.appService.showAlert('danger', `Error status ${resp.code}. Data tidak dapat disimpan.`);
        }
      }, error => {
        this.appService.showAlert('danger', error);
      }
    );
  }

  onTglBabhChanged(event): void {
    console.log(event.jsdate);
    
    const date = event.jsdate.toDateString();
    this.formBabh.patchValue({
      tanggalBabh: date
    });
  }

  onTglHilangChanged(event): void {
    console.log(event.jsdate.toDateString());
    
    const date = event.jsdate.toDateString();
    this.formBabh.patchValue({
      tanggalHilang: date
    });
  }

}
