import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AppAuthService } from 'app/services/app-auth.service';
import { DiatService } from 'app/services/diat.service';
import { Diat } from 'app/types/diat';

@Component({
  templateUrl: './diat-detail.component.html'
})
export class DiatDetailComponent implements OnInit {
  private prosessing: boolean;
  private diat: Diat;
  private allowEdit: boolean;

  constructor(
    private appServ: AppService,
    private appAuthServ: AppAuthService,
    private diatService: DiatService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.prosessing = true;
    this.diat = new Diat();
    const diatId = this.activatedRoute.snapshot.params['id'];
    this.diatService.getDiatById(diatId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('danger', 'Fatal error: Data DIAT tidak ditemukan.');
          window.history.back();
          return;
        }
        this.diat = resp.data[0];
        /* if user is creator and diat not approved, then allow edit */
        const userId = this.appAuthServ.getActiveUser().userId;
        // if (userId === this.diat.fpfIdPemberi) {
        //   if (this.diat.apprKaPemberi !== 1 && this.diat.apprKaPenerima !== 1) {
            this.allowEdit = true;
        //   }
        // }
        this.prosessing = false;
      },
      error => {
        this.appServ.showAlert('danger', error);
        window.history.back();
      }
    );
  }

  onBtnCetakClick(): void {
    window.print();
  }

  getApprIcon(id) {
    return "<span class='fa fa-check'></span>";
  }
}