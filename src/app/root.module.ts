import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from 'app/root.component';
import { RegisterComponent } from 'app/components/register.component';

import { AuthService } from 'app/services/auth.service';
import { AuthGuardService } from 'app/services/auth-guard.service';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: 'app/app.module#AppModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    RootComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [RootComponent]
})

export class RootModule { }
