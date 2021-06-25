import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalendarPanelComponent } from './calendar-panels/calendar-panels.component';

@NgModule({
  declarations: [
    CalendarPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    CalendarPanelComponent
  ]
})
export class MaterialCalendarModule { }
