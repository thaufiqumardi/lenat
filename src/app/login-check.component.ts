import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '{{statusText}}'
})

export class LoginCheckComponent implements OnInit {
  statusText: string;
  isLogedin: boolean;
  isRegistered: boolean;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    if (this.checkLogin()) {
      if (this.checkRegister()) {
        this.router.navigate(['1']);
      } else {
        this.router.navigate(['register']);
      }
    }
  }

  checkLogin(): boolean {
    this.statusText = 'login authentication...';
    return true;
  }

  checkRegister(): boolean {
    this.statusText = 'register checking...';
    return false;
  }
}
