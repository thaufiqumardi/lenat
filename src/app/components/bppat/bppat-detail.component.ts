import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { BppatService, Bppat } from 'app/services/bppat.service';

@Component({
  templateUrl: './bppat-detail.component.html',
  styleUrls: ['./bppat-detail.component.css']
})
export class BppatDetailComponent implements OnInit {
  bppat: Bppat;
  loading: boolean;
  selectedAt: number;

  constructor(
    private appService: AppService,
    private bppatService: BppatService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.bppat = new Bppat();
    const id = this.activatedRoute.snapshot.params['id'];
    this.bppatService.getBppatById(id).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          this.appService.showAlert('danger', 'Data BPPAT tidak ditemukan.');
          window.history.back();
          return;
        }
        this.bppat = resp.data[0];
        this.loading = false;
      },
      error => {
        this.appService.showAlert('danger', error.statusText);
        window.history.back();
      }
    );
  }

  onBtnCetakClick(): void {
    window.print();
  }

  onNoInventarisClick(diiId: number): void {
    this.selectedAt = diiId;
  }
}
