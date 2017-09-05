import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { BppatService, Bppat } from 'app/services/bppat.service';

@Component({
  templateUrl: 'bppat-return.component.html'
})

export class BppatReturnComponent implements OnInit {
  private prosessing: boolean;
  private bppat: Bppat;
  private dpTanggalPengembalian: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private bppatServ: BppatService
  ) { }

  ngOnInit() {
    this.prosessing = true;
    this.bppat = new Bppat();
    const id = this.activatedRoute.snapshot.params['id'];

    /* init tanggal pengembalian default value today */
    const today = new Date();
    this.dpTanggalPengembalian = {
      date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }
    };

    /* get bppat data by bppatId */
    this.bppatServ.getBppatById(id).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appService.showAlert('danger', 'Data BPPAT tidak ditemukan.');
          window.history.back();
          return;
        }
        this.bppat = resp.data[0];
        this.bppat.tanggalPengembalian = today;
        this.prosessing = false;
      },
      error => {
        this.appService.showAlert('danger', error.statusText);
        window.history.back();
      }
    );
  }

  onTanggalPengembalianChanged(event): void {
    this.bppat.tanggalPengembalian = event.jsdate;
  }

  onBtnKirimClick(): void {
    console.log(this.bppat);
  }
}
