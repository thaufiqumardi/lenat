import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AppComponent } from 'app/app.component';
// import { FpfComponent } from './components/fpf/fpf.component';
// import { FpfDashboardComponent } from './components/fpf/fpf-dashboard.component';
import { DiiListComponent } from 'app/components/dii/dii-list.component';
import { DiatListComponent } from 'app/components/diat/diat-list.component';
import { DiatNewComponent } from 'app/components/diat/diat-new.component';
import { DiatDetailComponent } from 'app/components/diat/diat-detail.component';
import { BppatListComponent } from 'app/components/bppat/bppat-list.component';
import { BppatNewComponent } from 'app/components/bppat/bppat-new.component';
import { BppatDetailComponent } from 'app/components/bppat/bppat-detail.component';
import { BppatEditComponent } from 'app/components/bppat/bppat-edit.component';
import { BppatEditNewComponent } from 'app/components/bppat/bppat-edit-new.component';
import { BppatEditReturnComponent } from 'app/components/bppat/bppat-edit-return.component';
import { BpatListComponent } from 'app/components/bpat/bpat-list.component';
import { BpatNewComponent } from 'app/components/bpat/bpat-new.component';
import { BpatDetailComponent } from 'app/components/bpat/bpat-detail.component';
import { BabhListComponent } from 'app/components/babh/babh-list.component';
import { BabhNewComponent } from 'app/components/babh/babh-new.component';
import { BabhDetailComponent } from 'app/components/babh/babh-detail.component';
import { DpatListComponent } from 'app/components/dpat/dpat-list.component';
import { DpatDetailComponent } from 'app/components/dpat/dpat-detail.component';
import { DpatNewComponent } from 'app/components/dpat/dpat-new.component';
import { NonDpatComponent } from 'app/components/nondpat/nonDpat-list.component';

import { AuthGuardService } from 'app/services/auth-guard.service';
import { AuthService } from 'app/services/auth.service';
import { DiiService } from 'app/services/dii.service';
import { DiatService } from 'app/services/diat.service';
import { BppatService } from 'app/services/bppat.service';
import { BpatService } from 'app/services/bpat.service';
import { BabhService } from 'app/services/babh.service';
import { DpatService } from 'app/services/dpat.service';
import { UserResolve } from 'app/services/user.resolve';

const ROUTES: Routes = [
  {
    path: '', component: AppComponent,
    canActivate: [AuthGuardService],
    resolve: { user: UserResolve },
    children: [
      {
        path: 'dii',
        children: [
          { path: '', component: DiiListComponent }
        ]
      },
      {
        path: 'diat',
        canActivate: [DiatService],
        children: [
          { path: '', component: DiatListComponent },
          { path: 'new', component: DiatNewComponent },
          { path: ':id', component: DiatDetailComponent }
        ]
      },
      {
        path: 'bppat',
        children: [
          { path: '', component: BppatListComponent },
          { path: 'new', component: BppatNewComponent },
          { path: ':id', component:  BppatDetailComponent },
          { path: ':id/edit', component: BppatEditComponent }
        ]
      },
      {
        path: 'bpat',
        children: [
          { path: '', component: BpatListComponent },
          { path: 'new', component: BpatNewComponent },
          { path: ':id', component:  BpatDetailComponent }
        ]
      },
      {
        path: 'babh',
        canActivate: [BabhService],
        children: [
          { path: '', component: BabhListComponent },
          { path: 'new', component: BabhNewComponent },
          { path: ':id', component: BabhDetailComponent }
        ]
      },
      {
        path: 'dpat',
        children: [
          { path: '', component: DpatListComponent},
          { path: 'new', component: DpatNewComponent},
          { path: ':id', component: DpatDetailComponent},
          // { path: 'detail', component: DpatDetailComponent}
        ]
      },
      {
        path: 'nondpat',
        children:[
          { path:'', component:NonDpatComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DiiService,
    DiatService,
    BppatService,
    BpatService,
    BabhService,
    DpatService,
    UserResolve
  ]
})

export class AppRoutingModule { }

export const Components = [
  AppComponent,

  DiiListComponent,

  DiatListComponent,
  DiatNewComponent,
  DiatDetailComponent,

  BppatListComponent,
  BppatNewComponent,
  BppatDetailComponent,
  BppatEditComponent,
  BppatEditNewComponent,
  BppatEditReturnComponent,

  BpatListComponent,
  BpatNewComponent,
  BpatDetailComponent,

  BabhListComponent,
  BabhNewComponent,
  BabhDetailComponent,

  DpatListComponent,
  DpatDetailComponent,
  DpatNewComponent,

  NonDpatComponent,

];
