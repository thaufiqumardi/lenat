import { Component, OnInit } from '@angular/core';

import { AppService } from 'app/services/app.service';
import { AuthService } from 'app/services/auth.service';
import { BppatService } from 'app/services/bppat.service';

@Component({
  templateUrl: './bppat-list.component.html'
})

export class BppatListComponent implements OnInit {
  allowNew = false;
  loadingTable = true;
  tableData;
  totalRows = 0;

  constructor(
    private appServ: AppService,
    private authService: AuthService,
    private bppatService: BppatService
  ) {}

  ngOnInit() {
    if (this.authService.getActiveRole().roleId === 1) {
      this.allowNew = true;
    }
    this.initTable();
  }

  initTable() {
    this.loadingTable = true;
    this.bppatService.getBppatList().subscribe(
      resp => {
        this.tableData = resp.data;
        this.totalRows = resp.total;
        this.loadingTable = false;
      },
      error => {
        this.appServ.errorHandler(error);
        this.loadingTable = false;
      }
    );
  }

  onPaginationClick(offset: number): void {
    this.bppatService.offset = offset;
    this.initTable();
  }
}
