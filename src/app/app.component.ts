import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

declare var jQuery: any;

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  activeRoleId: number;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('appComponent started');
  }

  ngOnInit() {
    const user = this.activatedRoute.snapshot.data['user'];
    if (user.data.length !== 1) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
      return;
    }
    this.authServ.activeUser = user.data[0];
    this.activeRoleId =  this.authServ.getActiveRole().roleId;
    // const roles = this.appAuthService.getActiveUser().roles;
    // roles.forEach(role => {
    //   this.roles.push({
    //     roleId: role.roleId,
    //     roleText: this.getRoleText(role.roleId, role.namaUnitKerja)
    //   });
    // });
    jQuery.AdminLTE.layout.activate();
  }

  onRoleChange(index: number): void {
    if (index === this.authServ.indexActiveRole) {
      return;
    }
    this.authServ.indexActiveRole = index;
    this.activeRoleId = this.authServ.getActiveRole().roleId;
    this.router.navigateByUrl('');
  }

  onBtnLogoutClick() {
    this.authServ.logout();
  }

  // getRoleText(roleId, namaUnitKerja) {
  //   switch (roleId) {
  //     case 1:
  //       return 'FPF - ' + namaUnitKerja;
  //     case 2:
  //       return 'Ka. FPF - ' + namaUnitKerja;
  //     case 3:
  //       return 'Admin GA';
  //     case 4:
  //       return 'Ka. Unit GA';
  //     case 5:
  //       return 'Logistik';
  //     case 6:
  //       return 'Ka. Bagian Pengadaan Dalam Negeri';
  //     case 7:
  //       return 'Admin Sisfo';
  //     case 8:
  //       return 'Ka. Bagian Pengadaan Luar Negeri';
  //     default:
  //       return undefined;
  //   }
  // }

}
