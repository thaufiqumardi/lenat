import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RupiahPipe } from 'app/pipes/rupiah.pipe';
import { ApprovalPipe } from 'app/pipes/approval.pipe';
import { LabelKondisiPipe } from 'app/pipes/labelkondisi.pipe';
import { MyDatePipe } from 'app/pipes/mydate.pipe';

@NgModule({
  declarations: [
    RupiahPipe,
    ApprovalPipe,
    LabelKondisiPipe,
    MyDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RupiahPipe,
    ApprovalPipe,
    LabelKondisiPipe,
    MyDatePipe
  ]
})

export class PipesModule { }
