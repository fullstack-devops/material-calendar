import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
import { CalendarPanelComponent } from './calendar-panel/calendar-panel.component';

@NgModule({
  declarations: [
    CalendarPanelsComponent,
    CalendarPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CalendarPanelsComponent,
    CalendarPanelComponent
  ]
})
export class MaterialCalendarModule { }
