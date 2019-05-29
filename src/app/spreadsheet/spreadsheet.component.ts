import { Component, OnInit, ViewChild } from '@angular/core';
import { HotTableComponent, HotColumnComponent } from '@handsontable/angular';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
  
  @ViewChild("spreadsheet", {read: HotTableComponent, static: false})
  spreadsheet: HotTableComponent;

  settings: Handsontable.GridSettings = {
    minRows: 20,
    minCols: 10,
    autoRowSize: false,
    className: "htCenter htMiddle",
    renderer: (instance, td, row, col, prop, value, cellProperties) => {
      if ((row > 0 && row < 16 && col < 2) || (false)) {
        td.style.background = '#e8f3ff';
      }
      td.innerText = value;
    },
    cells: (i, j) => {
      let meta: Handsontable.CellMeta = {};
      if (i < 2 || j < 2 || i > 15) {
        meta.readOnly = true;
      }
      
      return meta;
    },
    colWidths: i => {
      switch(i) {
        case 0:
        case 1:
          return 50
        case 2:
        case 3:
          return 80
        case 4:
          return 300
        default:
          return 32

      }
    },
    mergeCells: [
      {col: 5, colspan: 5, row: 0, rowspan: 1},
      {col: 0, colspan: 5, row: 0, rowspan: 1},
      {col: 0, colspan: 5, row: 16, rowspan: 1},
      {col: 0, colspan: 5, row: 17, rowspan: 1},
      {col: 0, colspan: 5, row: 18, rowspan: 1},
      {col: 0, colspan: 5, row: 19, rowspan: 1},
    ],
    customBorders: [
      {
       range: {from: {row: 1, col: 0}, to:{row: 3, col: 4}},
       top: {color: "red", width: -1},
       bottom: {color: "red"},
      },
    ],
  }

  data: any[][] = [
    ['', '', '', '', '', 'CODES'],
    ['DATE', 'JOUR', 'ARRIVÉE', 'DÉPART', 'DESCRIPTION'],
    ['', 'Dim', '00:00', '00:00'],
    ['', 'Lun', '00:00', '00:00'],
    ['', 'Mar', '00:00', '00:00'],
    ['', 'Mer', '00:00', '00:00'],
    ['', 'Jeu', '00:00', '00:00'],
    ['', 'Ven', '00:00', '00:00'],
    ['', 'Sam', '00:00', '00:00'],
    ['', 'Dim', '00:00', '00:00'],
    ['', 'Lun', '00:00', '00:00'],
    ['', 'Mar', '00:00', '00:00'],
    ['', 'Mer', '00:00', '00:00'],
    ['', 'Jeu', '00:00', '00:00'],
    ['', 'Ven', '00:00', '00:00'],
    ['', 'Sam', '00:00', '00:00'],
  ];

  constructor() {
    for (let i = 2; i < 16; i++) {
      this.data[i][0] = i - 1;
    }
  }

  ngOnInit() {
  }

  change() {
    console.log("CHANGE");
  }

  click1() {
    this.data.push(['2022', 40, 15, 12, 13]);
    this.spreadsheet.updateHotTable( this.settings );
  }

  click2() {
    this.data.forEach((row) => row.push("10000000000000000000000000000000"));
    this.spreadsheet.updateHotTable( this.settings );
  }

}
