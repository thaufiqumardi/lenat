import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mydate'})

export class MyDatePipe implements PipeTransform {
  private bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  transform(value: string, onlymonth = false): string {
    const date = new Date(value);
    if (onlymonth) {
      return this.bulan[date.getMonth()];
    }
    return `${date.getDate()} ${this.bulan[date.getMonth()]} ${date.getFullYear()}`;
  }
}
