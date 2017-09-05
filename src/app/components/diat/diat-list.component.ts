import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AuthService } from 'app/services/auth.service';
import { DiatService } from 'app/services/diat.service';
import { Diat } from 'app/types/diat';

@Component({
  templateUrl: './diat-list.component.html'
})

export class DiatListComponent implements OnInit {
  allowNew = false;
  tableData: Array<Diat | any> = [];
  loadingTable = true;
  totalRows = 0;

  constructor(
    private appServ: AppService,
    private authServ: AuthService,
    private diatServ: DiatService
  ) {}

  ngOnInit() {
    if (this.authServ.getActiveRole().roleId === 1) {
      this.allowNew = true;
    }
    this.initTable();
  }

  initTable() {
    this.loadingTable = true;
    this.diatServ.getDiatList().subscribe(
      resp => {
        this.tableData = resp.data;
        this.totalRows = resp.total;
        this.loadingTable = false;
      },
      error => this.appServ.errorHandler(error)
    );
  }

  onPaginationClick(offset) {
    this.diatServ.listOffset = offset;
    this.initTable();
  }
}
