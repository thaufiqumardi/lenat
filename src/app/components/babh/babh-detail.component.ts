import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { BabhService, Babh } from 'app/services/babh.service';

@Component({
  templateUrl: './babh-detail.component.html'
})

export class BabhDetailComponent implements OnInit {
  babh: Babh;
  loading = true;

  constructor(
    private appServ: AppService,
    private babhService: BabhService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.babh = new Babh();
    const babhId = this.activatedRoute.snapshot.params['id'];
    this.babhService.getBabhById(babhId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('danger', 'Data BABH tidak ditemukan.');
          window.history.back();
        }
        this.babh = resp.data[0];
        this.loading = false;
      },
      error => {
        this.appServ.showAlert('danger', error);
        window.history.back();
      }
    );
  }

  setHari(date: string) {
    const hari = new Date(date).getDay();
    switch (hari) {
      case 0:
        return 'Minggu';
      case 1:
        return 'Senin';
      case 2:
        return 'Selasa';
      case 3:
        return 'Rabu';
      case 4:
        return 'Kamis';
      case 5:
        return 'Jumat';
      case 6:
        return 'Sabtu';
      default:
        return '[Unknowed]';
    }
  }

  setBulan(date: string) {
    const bulan = new Date(date).getMonth();
    switch (bulan) {
      case 0:  return 'Januari';
      case 1:  return 'Februari';
      case 2:  return 'Maret';
      case 3:  return 'April';
      case 4:  return 'Mei';
      case 5:  return 'Juni';
      case 6:  return 'Juli';
      case 7:  return 'Agustus';
      case 8:  return 'September';
      case 9: return 'Oktober';
      case 10: return 'November';
      case 11: return 'Desember';
      default: return '';
    }
  }

  onBtnCetakClick(){
    window.print();
    // let printContent, popupWin;
    // printContent = document.getElementById('print-section').innerHTML;
    // popupWin = window.open(window.location.href, '_blank', 'top=0,left=0,height=100%,width=auto,titlebar=no');
    // popupWin.document.open();
    // // popupWin.document.write(`
    // //   <html>
    // //     <head>
    // //       <style rel="stylesheet" type="text/css" href="styles.css"></style>
    // //     </head>
    // //     <body onload="window.print();">${printContent}</body>
    // //   </html>`
    // // );
    // popupWin.document.close();
  }
}
