import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
// import { AppComponent } from 'app/app.component';

import { AppService } from 'app/services/app.service';
// import { AppAuthService } from 'app/services/app-auth.service';
import { AuthService } from 'app/services/auth.service';
import { DpatService } from 'app/services/dpat.service';
@Component({
    templateUrl:'./dpat-list.component.html'
})
export class DpatListComponent implements OnInit{
    allowNew = false;
    loadingTable = true;
    tableData;
    totalRows = 0;
  
    constructor(
      private appServ: AppService,
      private appAuthService: AuthService,
      private dpatService: DpatService,
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
      this.dpatService.getDpatList().subscribe(
        resp => {
          this.tableData = resp.data;
          this.totalRows = resp.total;
          this.loadingTable = false;
        },
        error => {
          this.appServ.showAlert('danger', error);
        }
      );
    }
  
    onPaginationClick(offset: number): void {
      this.dpatService.offset = offset;
      this.initTable();
    }
}