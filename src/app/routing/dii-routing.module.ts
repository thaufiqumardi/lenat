import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { DiiListComponent } from 'app/components/dii/dii-list.component';

import { DiiService } from 'app/services/dii.service';

const ROUTES: Routes = [
  { path: '', component: DiiListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
  providers: [DiiService]
})

export class DiiRoutingModule { }

export const DiiComponents = [
  DiiListComponent
];
