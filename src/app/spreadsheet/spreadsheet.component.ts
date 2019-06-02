import { Component, OnInit, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';
import { PayDataService } from './pay-data.service';
import { getSettings, PAY_TEMPLATE } from './spreadsheet-settings';
import { HotTableComponent } from '@handsontable/angular';
import { PeriodData, DayData } from './period-data';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
  
  @ViewChild('spreadsheet', {read: HotTableComponent, static: true})
  spreadsheet: HotTableComponent;

  data: any[][];
  
  get settings(): Handsontable.GridSettings {
    return getSettings(() => [1, 4, 5, 6]);
  }
  
  onAfterChange: Function = ((changes: Handsontable.CellChange[], source: Handsontable.ChangeSource) => {
    if ((source === 'edit' || source === 'CopyPaste.paste')) {
      let changedAmounts = false;

      changes.forEach((value: [number, string | number, any, any]) => {
        if (value[0] > 0 && value[0] < 16 && value[1] > 4) {
          if (String(value[3]) === '')
            this.data[value[0]][value[1]] = null;
          else
            this.data[value[0]][value[1]] = Number(String(value[3]).replace(",", "."));
          changedAmounts = true;
        }
      });

      if (changedAmounts)
        this.calculate(this.getCodes(this.payDataService.getPeriodData()));
    }
    

  }).bind(this);

  constructor(private payDataService: PayDataService) {
    this.data = PAY_TEMPLATE;
    this.fillPayData();
    this.fillDate();
  }

  ngOnInit() {}

  private fillPayData(): void {
    let payData = this.payDataService.getPeriodData();
    let codes = this.getCodes(payData);

    codes.forEach((value: number, index: number) => {
      this.data[1][index + 5] = value;
    });

    payData.getDaysData().forEach((dayData: DayData, index: number) => {
      this.data[index + 2][2] = dayData.getFromHour();
      this.data[index + 2][3] = dayData.getToHour();
      this.data[index + 2][4] = dayData.getDescription();

      dayData.getCodesData().forEach((value: number, key: number) => {
        this.data[index + 2][5 + codes.indexOf(key)] = value;
      });
    });
    
    this.calculate(codes);
  }

  private getCodes(payData: PeriodData): number[] {
    let codes: number[] = [];

    payData.getDaysData().forEach((dayData: DayData) => {
      dayData.getCodesData().forEach((value: number, key: number) => {
        if (!codes.includes(key)) {
          codes.push(key);
        }
      });
    });

    return codes.sort((a: number, b: number) => a - b );
  }

  private fillDate(): void {
    let date = this.getDateFromWeekNo(this.payDataService.getPeriodData().getWeekNo());

    for (let i = 0; i < 14; i++) {
      this.data[i+2][0] = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2);
      date.setDate(date.getDate() + 1);
    }
  }

  private getDateFromWeekNo(no: number): Date {
    let date: Date = new Date();
    date.setFullYear(2019, 8, 1);
    date.setDate(date.getDate() + 14 * no);
    return date;
  }

  private calculate(codes: number[]): void {
    let salary = 0;

    for (let i = 0; i < codes.length; i++) {
      
      let total = 0;
      for (let j = 0; j < 14; j++) {
        if (typeof this.data[j + 2][i + 5] === 'number')
          total += this.data[j + 2][i + 5];
      }

      this.data[16][i + 5] = `${total}`.slice(0, Math.ceil(Math.log10(total)) + 3 );
      this.data[17][i + 5] = `$${total.toFixed(2)}`;
      let sum = total * total;
      this.data[18][i + 5] = `$${sum.toFixed(2)}`;

      salary += sum;
    }

    this.data[19][5] = `$${salary.toFixed(2)}`;
  }
}
