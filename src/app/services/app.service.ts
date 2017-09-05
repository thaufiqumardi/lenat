import { Injectable } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';

import { Observable, Observer, Subject } from 'rxjs/rx';
import 'rxjs/add/operator/share';

@Injectable()
export class AppService {
  public alert$: Observable<{ type: string, message: string }>;
  private alertObserver: Observer<{type: string, message: string}>;

  private myDpOptions: IMyDpOptions = {
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
    showClearDateBtn: false
  };

  constructor() {
    console.log(':: app service is running ::');
    this.alert$ = new Observable<any>(x => this.alertObserver = x).share();
  }

  public getDpOptions(): IMyDpOptions {
    return this.myDpOptions;
  }

  public showAlert(alertType: string, alertMessage: string): void {
    this.alertObserver.next({ type: alertType, message: alertMessage });
  }

  public errorHandler(error: any) {
    let errorMessage: string;
    console.error(error);
    if (error.error instanceof Error) { // tes
      console.log('An error occurred:', error.error.message); // tes
    } // tes
    if (error.status === 0) {
      errorMessage = 'Gagal terhubung dengan server';
    } else {
      errorMessage = error.toString();
    }
    this.showAlert('danger', errorMessage);
  }
}
