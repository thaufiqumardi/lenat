import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // const token = localStorage.getItem('token');
    // if (token == null) {
    //   const loginUrl = this.authGuardServ.getLoginUrl();
    //   localStorage.setItem('token', btoa('1')); // sementara
    //   window.location.href = loginUrl;
    // } else {
    //   this.authGuardServ.initActiveUser().subscribe(
    //     resp => {
    //       const activeUser = resp.data[0];
    //       console.log('redirec to app');
    //       this.router.navigate([activeUser.roles[0].roleId]);
    //     }
    //   );
    // }
  }
}
