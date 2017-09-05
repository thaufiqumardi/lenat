import { Component, OnInit } from '@angular/core';

import { DiiService } from 'app/services/dii.service';
import { AppService } from 'app/services/app.service';

import { AppComponent } from 'app/app.component';

@Component({
  templateUrl: './dii-list.component.html'
})

export class DiiListComponent {
  totalRows = 0;
  tableData: Array<any>;
  loadingTable: boolean;

  /* for detail at component */
  selectedAt;

  constructor(
    private diiService: DiiService,
    private appServ: AppService
  ) {
    this.initTable();
  }

  initTable(): void {
    this.loadingTable = true;
    this.diiService.getDiiList().subscribe(
      resp => {
        this.tableData = resp.data;
        this.totalRows = resp.total;
        this.loadingTable = false;
      },
      error => {
        this.appServ.showAlert('danger', error.statusText);
        this.loadingTable = false;
      }
    );
  }

  onBtnDetailClick(id): void {
    this.selectedAt = id;
  }

  onPaginationClick(offset: number): void {
    this.diiService.tableOffset = offset;
    this.initTable();
  }
}
