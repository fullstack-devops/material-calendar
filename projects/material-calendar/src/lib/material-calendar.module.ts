import { NgModule } from '@angular/core';
import { CalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CalendarPanelsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [CalendarPanelsComponent]
})
export class MaterialCalendarModule { }
