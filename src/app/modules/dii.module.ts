import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DiiService } from 'app/services/dii.service';

import { PipesModule } from 'app/modules/pipes.module';
import { PaginationModule } from 'app/modules/pagination.module';
import { DiiRoutingModule, DiiComponents } from 'app/routing/dii-routing.module';

import { ModalDetailAtComponent } from 'app/components/modal-detail-at.component';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    PaginationModule,
    PipesModule,
    DiiRoutingModule,
  ],
  declarations: [
    DiiComponents,
    ModalDetailAtComponent
  ],
  providers: [DiiService],
})

export class DiiModule { }
