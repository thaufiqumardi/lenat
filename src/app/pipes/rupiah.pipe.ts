import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'rupiah'})

export class RupiahPipe implements PipeTransform {
  transform(value: string, symbol: boolean = false, comma: boolean = false): string {
    let newFormat: string;
    value = value == null ? '0' : value;
    newFormat = parseInt(value).toLocaleString();
    newFormat = newFormat.toString().replace(/\,/g, ".");
    
    if (symbol) { newFormat = 'Rp ' + newFormat }
    if (comma) { newFormat = newFormat + ',-' }
    
    return newFormat;
  }
}