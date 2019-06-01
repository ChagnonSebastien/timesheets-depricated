import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Handsontable from 'handsontable';
import { PayDataService } from './pay-data.service';
import { getSettings } from './spreadsheet-settings';
import { HotTableRegisterer, HotTableComponent } from '@handsontable/angular';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit, AfterViewInit {
  
  @ViewChild('spreadsheet', {read: HotTableComponent, static: true})
  public spreadsheet: HotTableComponent;
  
  public erer: ElementRef;

  private data: any[][];
  
  get settings(): Handsontable.GridSettings {
    return getSettings(() => ['1', '4', '5', '6']);
  }

  constructor(private payDataService: PayDataService, private hotRegisterer: HotTableRegisterer) {
    this.data = this.payDataService.changeDate(0);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
  
  onAfterChange(changes: any, source: string) {
    if (source === "populateFromArray" || source === "loadData")
      return false;

    console.log(this.spreadsheet);
    console.log(changes, source);
  }

  onAfterChangeBound: Function = this.onAfterChange.bind(this);

}
