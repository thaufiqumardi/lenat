import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { BabhListComponent } from 'app/components/babh/babh-list.component';
import { BabhDetailComponent } from 'app/components/babh/babh-detail.component';
import { BabhNewComponent } from 'app/components/babh/babh-new.component';

import { AuthGuardService } from 'app/services/auth-guard.service';
import { BabhService } from 'app/services/babh.service';

const ROUTES: Routes = [
  { path: '', component: BabhListComponent },
  { path: 'new', component: BabhNewComponent },
  { path: ':id', component: BabhDetailComponent }
  // {
  //   path: '', component: AppComponent,
  //   canActivate: [AuthGuardService, BabhService],
  //   children: [
  //     { path: 'babh', component: BabhListComponent },
  //     { path: 'babh/new', component: BabhNewComponent },
  //     { path: 'babh/:id', component: BabhDetailComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
  providers: [BabhService]
})
export class BabhRoutingModule { }

export const BabhComponents = [
  BabhListComponent,
  BabhNewComponent,
  BabhDetailComponent
];
