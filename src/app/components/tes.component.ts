import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'tes.component.html',
  styles: [`
    .scrollspy-example {
      position: relative;
      height: 200px;
      margin-top: 10px;
      overflow: auto;
    }
  `]
})

export class TesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}