import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { BpatListComponent } from 'app/components/bpat/bpat-list.component';
import { BpatNewComponent } from 'app/components/bpat/bpat-new.component';
import { BpatDetailComponent } from 'app/components/bpat/bpat-detail.component';

import { AuthGuardService } from 'app/services/auth-guard.service';
import { BpatService } from 'app/services/bpat.service';

const ROUTES: Routes = [
  {
    path: '', component: AppComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'bpat', component: BpatListComponent },
      { path: 'bpat/new', component: BpatNewComponent },
      { path: 'bpat/:id', component: BpatDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
  providers: [BpatService]
})
export class BpatRoutingModule { }

export const BpatComponents = [
  BpatListComponent,
  BpatNewComponent,
  BpatDetailComponent
];
