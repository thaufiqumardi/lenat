import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppAuthService } from 'app/services/app-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'app-menu.component.html'
})
export class AppMenuComponent implements OnInit {
  @Input() roleId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AppAuthService
  ) { }

  ngOnInit() {
    // cek memiliki role tersebut atau tidak
    // const roleId = this.activatedRoute.snapshot.params['roleId'];
    // const userRoles = this.auth.getActiveUser().roles;
    // if (userRoles.findIndex(x => x.roleId == roleId) === -1) {
    //   this.router.navigate(['not-found']);
    // } else {
    //   this.roleId = roleId;
    // }
  }

}
