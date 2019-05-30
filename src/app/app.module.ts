import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { HotTableModule } from '@handsontable/angular';
import { PayDataService } from './spreadsheet/pay-data.service';

@NgModule({
  declarations: [
    AppComponent,
    SpreadsheetComponent
  ],
  imports: [
    BrowserModule,
    HotTableModule.forRoot()
  ],
  providers: [
    PayDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
