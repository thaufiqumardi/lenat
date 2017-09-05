import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { BppatListComponent } from 'app/components/bppat/bppat-list.component';
import { BppatNewComponent } from 'app/components/bppat/bppat-new.component';
import { BppatDetailComponent } from 'app/components/bppat/bppat-detail.component';
import { BppatReturnComponent } from 'app/components/bppat/bppat-return.component';
import { BppatEditComponent } from "app/components/bppat/bppat-edit.component";

import { AuthGuardService } from 'app/services/auth-guard.service';
import { BppatService } from 'app/services/bppat.service';

const ROUTES: Routes = [
  {
    path: '', component: AppComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'bppat', component: BppatListComponent },
      { path: 'bppat/new', component: BppatNewComponent },
      { path: 'bppat/:id', component: BppatDetailComponent },
      { path: 'bppat/:id/pengembalian', component: BppatReturnComponent },
      { path: 'bppat/:id/edit', component: BppatEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
  providers: [BppatService]
})
export class BppatRoutingModule { }

export const BppatComponents = [
  BppatListComponent,
  BppatNewComponent,
  BppatDetailComponent,
  BppatReturnComponent,
  BppatEditComponent
];
