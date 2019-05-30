import { Component, OnInit, ViewChild } from '@angular/core';
import { HotTableComponent } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { PayDataService } from './pay-data.service';
import { getSettings } from './spreadsheet-settings';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
  
  @ViewChild("spreadsheet", {read: HotTableComponent, static: false})
  private spreadsheet: HotTableComponent;

  get data(): any[][] {
    return this.payDataService.getData();
  }
  
  get settings(): Handsontable.GridSettings {
    return getSettings(() => ['1', '4', '5', '6']);
  }

  constructor(private payDataService: PayDataService) {
    this.payDataService.changeDate(0);
  }

  ngOnInit() {
  }

}
