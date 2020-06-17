import { Component } from '@angular/core';
import { CalendarConfig } from 'projects/material-calendar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';

  placeholder = false // boolean
  mode = 'monthly' // 'annual' | 'monthly'

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

  switchMode() {
    this.mode = (this.mode === 'monthly') ? 'annual' : 'monthly'
  }
}