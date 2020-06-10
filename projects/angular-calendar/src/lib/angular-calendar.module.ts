import { NgModule } from '@angular/core';
import { CalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
import { BrowserModule } from '@angular/platform-browser';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [CalendarPanelsComponent],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatIconModule
  ],
  exports: [CalendarPanelsComponent]
})
export class AngularCalendarModule { }
