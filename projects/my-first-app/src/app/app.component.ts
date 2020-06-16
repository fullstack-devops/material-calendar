import { Component } from '@angular/core';
import { CalendarConfig } from 'projects/material-calendar/src/lib/service/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';

  placeholder = false
  calendarConfig: CalendarConfig = {
    panelBgColor: '#00677f', // 00677f 006105
    autoTextColor: true,
    textColor: '#fff',
    useHolidays: false,
    holidayColor: 'rgb(253, 173, 0)',
    holidayTextColor: 'rgb(253, 173, 0)',
    displayYear: true,
    calendarWeek: true,
    switches: false,
  }
  mode = 'monthly'

  switchMode() {
    this.mode = (this.mode === 'monthly') ? 'annual' : 'monthly'
  }
}