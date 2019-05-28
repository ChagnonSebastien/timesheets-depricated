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
    
  }

  data: any[][] = [
    ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ];

  constructor() { }

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
