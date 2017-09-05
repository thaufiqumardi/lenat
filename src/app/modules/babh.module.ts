import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { BabhRoutingModule, BabhComponents } from 'app/routing/babh-routing.module';
import { PipesModule } from 'app/modules/pipes.module';
import { PaginationModule } from 'app/modules/pagination.module';

import { BabhService } from 'app/services/babh.service';

@NgModule({
  declarations: [
    BabhComponents
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    MyDatePickerModule,
    PaginationModule,
    PipesModule,
    BabhRoutingModule
  ],
  providers: [ BabhService ]
})
export class BabhModule {}
