import { Injectable } from '@angular/core';
import { PAY_TEMPLATE } from './spreadsheet-settings';

@Injectable({
  providedIn: 'root'
})
export class PayDataService {

  private firstDate: Date;
  private data: any[][];

  constructor() {
    this.data = PAY_TEMPLATE;
  }

  private getDateFromWeekNo(no: number): Date {
    var date: Date = new Date();
    date.setFullYear(2019, 8, 1);
    date.setDate(date.getDate() + 14 * no);
    return date;
  }

  public changeDate(no: number): any[][] {
    this.firstDate = this.getDateFromWeekNo(no);
    let date = this.firstDate;

    for (let i = 0; i < 14; i++) {
      this.data[i+2][0] = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2);
      date.setDate(date.getDate() + 1);
    }
    
    return this.data;
  }

  public getData(): any[][] {
    return this.data;
  }

  public setData(data: any[][]): void {
    this.data = data;
  }
}
