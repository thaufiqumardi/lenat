import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BppatService, Bppat } from 'app/services/bppat.service';
import { AppService } from 'app/services/app.service';

@Component({
  template: `<bppat-edit-new *ngIf="bppat.jenisBppat===1" [bppat]="bppat"><bppat-edit-new>
             <bppat-edit-return *ngIf="bppat.jenisBppat===2" ><bppat-edit-return>`
})

export class BppatEditComponent implements OnInit {
  bppat = new Bppat();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bppatServ: BppatService,
    private appServ: AppService
  ) { }

  ngOnInit() {
    const bppatId = this.activatedRoute.snapshot.params['id'];
    this.bppatServ.getBppatById(bppatId).subscribe(
      resp => {
        if (resp.data.length !== 1) {
          this.appServ.showAlert('warning', 'Maaf, data BPPAT tidak ditemukan.');
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          return;
        }
        this.bppat = resp.data[0];
      },
      error => {
        this.appServ.errorHandler(error);
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }
}
