import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { PaginationModule } from 'app/modules/pagination.module';
import { PipesModule } from 'app/modules/pipes.module';
import { AppRoutingModule, Components } from './app-routing.module';
// import { BppatRoutingModule, BppatComponents } from 'app/routing/bppat-routing.module';
// import { BpatRoutingModule, BpatComponents } from 'app/routing/bpat-routing.module';
// import { BabhRoutingModule, BabhComponents } from 'app/routing/babh-routing.module';
// import { DiiRoutingModule, DiiComponents } from 'app/routing/dii-routing.module';

import { AppService } from 'app/services/app.service';
import { AuthService } from 'app/services/auth.service';
import { AppAuthService } from 'app/services/app-auth.service';

import { AppMenuComponent } from 'app/components/app-menu.component';
import { ModalAlertComponent } from 'app/components/modal-alert.component';
import { ModalDetailAtComponent } from 'app/components/modal-detail-at.component';

import { PaginationComponent } from 'app/components/pagination.component';

import { BppatEditNewComponent } from 'app/components/bppat/bppat-edit-new.component';
import { BppatEditReturnComponent } from 'app/components/bppat/bppat-edit-return.component';

@NgModule({
  declarations: [
    AppMenuComponent,
    ModalAlertComponent,

    ModalDetailAtComponent,
    Components, // BppatComponents, BpatComponents, BabhComponents, DiiComponents
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, // BppatRoutingModule, BpatRoutingModule, BabhRoutingModule, DiiRoutingModule
    MyDatePickerModule,
    PaginationModule,
    PipesModule
  ],
  providers: [AppService, AuthService, AppAuthService]
})

export class AppModule { }
