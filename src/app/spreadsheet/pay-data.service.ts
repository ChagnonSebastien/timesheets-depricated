import { Injectable } from '@angular/core';
import { PeriodData } from './period-data';

@Injectable({
  providedIn: 'root'
})
export class PayDataService {

  private periodData: PeriodData;

  constructor() {
    this.periodData = new PeriodData(0, 0);
  }

  public getPeriodData(): PeriodData {
    return this.periodData;
  }
}
