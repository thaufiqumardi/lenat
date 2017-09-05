import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AppAuthService } from 'app/services/app-auth.service';
import { BpatService, Bpat } from 'app/services/bpat.service';

@Component({
  templateUrl: './bpat-detail.component.html'
})
export class BpatDetailComponent implements OnInit {
  private prosessing: boolean;
  private bpat: Bpat;
  private allowEdit: boolean;

  constructor(
    private appServ: AppService,
    private appAuthServ: AppAuthService,
    private bpatService: BpatService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.prosessing = true;
    this.bpat = new Bpat();
    const bpatId = this.activatedRoute.snapshot.params['id'];
    this.bpatService.getBpatById(bpatId).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appServ.showAlert('danger', 'Fatal error: Data BPAT tidak ditemukan.');
          window.history.back();
          return;
        }
        this.bpat = resp.data[0];
        /* if user is creator and bpat not approved, then allow edit */
        const userId = this.appAuthServ.getActiveUser().userId;
        // if (userId === this.bpat.fpfIdPemberi) {
        //   if (this.bpat.apprKaPemberi !== 1 && this.bpat.apprKaPenerima !== 1) {
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