import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  template: `
      <ul class="pagination pagination-sm no-margin pull-right">
        <li *ngIf="pages[0]!=1" title="Halaman 1">
          <a (click)="onBtnPageClick(1)" aria-label="First">
          <span class="fa fa-fast-backward" aria-hidden="true"></span>
          </a>
        </li>
        <li *ngFor="let page of pages; let i = index" [class.active]="page == activePage" title="Halaman {{page}}">
          <a (click)="onBtnPageClick(page)">{{page}}</a>
        </li>
        <li *ngIf="totalPages>pages[8]" title="Halaman {{totalPages}}">
          <a (click)="onBtnPageClick(totalPages)" aria-label="Last">
            <span class="fa fa-fast-forward" aria-hidden="true"></span>
          </a>
        </li>
      </ul>
    `
})

export class PaginationComponent implements OnChanges {
  @Input('offset') curOffset = 0;
  @Input() totalRows = 0;
  @Input() perPage = 10;

  @Output() offset = new EventEmitter<number>();

  private pages: Array<number> = [];
  private activePage: number;
  private totalPages: number;

  constructor() { }

  ngOnChanges(changes) {
    this.activePage = (this.curOffset / this.perPage) + 1;
    this.totalPages = Math.ceil(this.totalRows / this.perPage);

    let startPage = this.activePage < 5 ? 1 : this.activePage - 4;
    const endPage = startPage + 8 < this.totalPages ? startPage + 8 : this.totalPages;
    const diff = startPage - endPage + 8;
    startPage -= startPage - diff > 0 ? diff : 0;

    this.pages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  onBtnPageClick(page: number): void {
    this.activePage = page;
    this.offset.emit((page - 1) * this.perPage);
  }
}
