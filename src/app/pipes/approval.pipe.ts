import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approval'
})

export class ApprovalPipe implements PipeTransform {
  transform(value: number): string {
    let labelClass;
    let iconClass;
    let title;
    switch (value) {
      case 1:
        labelClass = "label-success";
        iconClass = "fa-check-circle text-green";
        title = "Approved";
        break;
      case 2:
        labelClass = "label-danger";
        iconClass = "fa-minus-circle text-red";
        title = "Rejected";
        break;
      default:
        labelClass = "label-warning";
        iconClass = "fa-question-circle text-yellow";
        title = "Pending";
    }
    return `<span class="fa ${iconClass}" title="${title}"></span>`;
  }
}
