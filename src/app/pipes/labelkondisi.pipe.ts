import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelkondisi'
})

export class LabelKondisiPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'BP':
        return `<span class="label label-success" title="Baik Dipakai">${value}</span>`;
      case 'RB':
        return `<span class="label label-danger" title="Rusak Berat">${value}</span>`;
      case 'RR':
        return `<span class="label label-warning" title="Rusak Ringan">${value}</span>`;
      case 'BT':
        return `<span class="label label-primary" title="Baik Tidak Dipakai">${value}</span>`;
      default:
        return value;
      }
  }
}
