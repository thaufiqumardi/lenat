import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from 'app/services/app.service';
import { AuthService } from 'app/services/auth.service';
import { BabhService } from 'app/services/babh.service';

@Component({
  templateUrl: './babh-list.component.html'
})

export class BabhListComponent implements OnInit {
  allowNew = false;
  tableData;
  loadingTable = true;
  totalRows = 0;

  constructor(
    private appServ: AppService,
    private appAuthService: AuthService,
    private babhService: BabhService
  ) {}

  ngOnInit() {
    const role = this.appAuthService.getActiveRole();
    if (role.roleId === 1) {
      this.allowNew = true;
    }
    this.initTable();
  }

  initTable() {
    this.loadingTable = true;
    this.babhService.getBabhList().subscribe(
      resp => {
        this.tableData = resp.data;
        this.totalRows = resp.total;
        this.loadingTable = false;
      },
      error => this.appServ.errorHandler(error)
    );
  }

  onPaginationClick(offset) {
    this.babhService.offset = offset;
    this.initTable();
  }
}
