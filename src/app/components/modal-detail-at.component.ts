import { Component, OnChanges, Input } from '@angular/core';
import { AtService } from 'app/services/at.service';

@Component({
  selector: 'modal-detail-at',
  templateUrl: './modal-detail-at.component.html',
  styles: [`dt { margin-top: 7px; }`],
  providers: [AtService]
})

export class ModalDetailAtComponent implements OnChanges {
  @Input() id: number;

  prosessing: boolean;
  at: Object;
  editKondisi: boolean;

  constructor(
    private atServ: AtService
  ) { }

  ngOnChanges(changes) {
    this.at = new Object();
    this.editKondisi = false;
    if (changes.firstChange || changes.currentValue == '') {
      return;
    }
    this.prosessing = true;
    this.atServ.getAtById(this.id).subscribe(
      resp => {
        if (resp.data.length === 0 || resp.data == '') {
          /* show error message */
        } else {
          this.at = resp.data[0];
        }
        this.prosessing = false;
      },
      error => {
        /* show error message */
        this.prosessing = false;
      }
    );
  }

  getKondisi(kondisi: string): string {
    switch (kondisi) {
    case 'BP':
      return 'Baik Dipakai';
    case 'RB':
      return 'Rusak Berat';
    case 'RR':
      return 'Baik Ringan';
    case 'BT':
      return 'Baik Tidak Dipakai';
    default:
      return '';
    }
  }

  onUbahKondisiClick() {
    this.editKondisi = true;
  }

  onBtnSimpanClick(kondisi) {
    console.log(kondisi);
  }
}
