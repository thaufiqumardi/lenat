import { Component } from '@angular/core';
import { AppService } from 'app/services/app.service';

declare var jsFunction: any;

@Component({
  selector: 'modal-alert',
  template: `
    <div class="modal modal-{{alert?.type}} fade" id="alert" tabindex="-1" role="dialog" aria-labelledby="alert" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">
              <span class="fa fa-ban" *ngIf="alert.type=='danger'"></span>
              <span class="fa fa-warning" *ngIf="alert.type=='warning'"></span>
              <span class="fa fa-info-circle" *ngIf="alert.type=='info'"></span>
              {{alert?.type | titlecase}}
            </h4>
          </div>
          <div class="modal-body">
            {{alert?.message}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>`
})

export class ModalAlertComponent {
  private alert: { type: string, message: string };

  constructor(
    private appService: AppService
  ) {
    this.alert = { type: '', message: '' };
    this.appService.alert$.subscribe(alert => {
      console.log('alert data changed dectected');
      this.alert = alert;
      this.showAlert();
    });
  }

  showAlert(): void {
    if (this.alert !== undefined) {
      jsFunction.showAlert();
    }
  }
}