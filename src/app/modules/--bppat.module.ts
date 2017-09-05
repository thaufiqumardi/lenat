import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MyDatePickerModule } from 'mydatepicker';

import { BppatService } from 'app/services/bppat.service';

import { PaginationModule } from 'app/modules/pagination.module';
import { PipesModule } from 'app/modules/pipes.module';
import { BppatRoutingModule, BppatComponents } from 'app/routing/bppat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BppatRoutingModule,
    PaginationModule,
    PipesModule,
    // MyDatePickerModule
  ],
  declarations: [BppatComponents],
  // providers: [BppatService]
})
export class BppatModule { }
