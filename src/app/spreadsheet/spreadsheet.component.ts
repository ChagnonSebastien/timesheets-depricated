import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  
  @ViewChild('sprsh', {read: ElementRef, static: false})
  public sprsh: ElementRef;

  private data: any[][];
  
  get settings(): Handsontable.GridSettings {
    return getSettings(() => ['1', '4', '5', '6']);
  }

  constructor(private payDataService: PayDataService) {
    this.data = this.payDataService.changeDate(0);
  }

  ngOnInit() {
  }
  
  onAfterChange(changes: any, source: string) {
    console.log(this.sprsh)
    if (source === "populateFromArray") {

    }
  }

}
