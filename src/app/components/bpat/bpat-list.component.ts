import { Component, OnInit } from '@angular/core';

import { AppAuthService } from 'app/services/app-auth.service';
import { AppService } from 'app/services/app.service';
import { BpatService } from 'app/services/bpat.service';

@Component({
  templateUrl: './bpat-list.component.html'
})
export class BpatListComponent implements OnInit {
  private prosessing: boolean;
  private tableData: Array<any> = [];
  private totalRows = 0;
  private allowNew = false;

  constructor(
    private appAuthService: AppAuthService,
    private appServ: AppService,
    private bpatService: BpatService
  ) { }

  ngOnInit() {
    const role = this.appAuthService.getActiveRole();
    if (role.roleId === 1) {
      this.allowNew = true;
    }
    this.initTable();
  }

  initTable(): void {
    this.prosessing = true;
    this.bpatService.getBpatList().subscribe(
      resp => {
        this.tableData = resp.data;
        this.totalRows = resp.total;
        this.prosessing = false;
      },
      error => {
        this.appServ.showAlert('danger', error);
        this.prosessing = false;
      }
    );
  }

  onPaginationClick(offset: number): void {
    this.bpatService.offset = offset;
    this.initTable();
  }
}
