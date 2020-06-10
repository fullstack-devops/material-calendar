import { Component, OnInit, HostBinding } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import * as pSBC from '../service/pSBC';

interface Config {
  textColor: string;
  panelBgColor?: string;
  panelColor?: string;
  holidayBgColor?: string;
  holidayColor?: string;
  displayYear: boolean;
  switches: boolean;
}

@Component({
  selector: 'calendar-panels',
  inputs: ['mode', 'placeholderDay', 'config', 'year', 'month', 'monthsBefore', 'monthsAfter'],
  templateUrl: './calendar-panels.component.html',
  styleUrls: ['./calendar-panels.component.scss']
})
export class CalendarPanelsComponent implements OnInit {

  placeholderDay: boolean = false
  isLoading = true
  config: Config = {
    panelBgColor: '#00677f',
    textColor: 'white',
    holidayBgColor: 'rgb(0, 103, 127)',
    holidayColor: 'rgb(0, 103, 127)',
    displayYear: false,
    switches: false
  }
  mode = 'monthly' // monthly | annual

  year = new Date().getFullYear()
  month = new Date().getUTCMonth()
  monthsBefore = 0
  monthsAfter = 0
  calendar = null
  weekdayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']


  @HostBinding("style.--panel-color")
  private panelBgColor = this.config.panelBgColor;
  @HostBinding("style.--panel-color-darker")
  private panelBgColorDarker = pSBC.pSBC(-0.4, this.config.panelBgColor);
  @HostBinding("style.--panel-color-lighter")
  private panelBgColorLighter = pSBC.pSBC(0.3, this.config.panelBgColor);
  @HostBinding("style.--text-color")
  private panelColor = this.config.textColor;
  @HostBinding("style.--panel-color-holiday")
  private panelBgColorHoliday = this.config.holidayBgColor;
  @HostBinding("style.--text-color-holiday")
  private panelColorHoliday = this.config.holidayColor;

  constructor(private calendarService: CalendarService) {
    this.panelBgColor = this.config.panelBgColor;
    console.log(this.mode)
    if (this.mode === 'annual') {
      this.calendar = this.calendarService.generateMatrix(null, this.year)
    } else if (this.mode === 'monthly') {
      console.log(this.month)
      this.calendar = this.calendarService.generateMatrix(null, this.year, this.month, this.monthsBefore, this.monthsAfter)
    }
  }

  ngOnInit() {
    console.log(this.placeholderDay)
    this.calendar = this.calendarService.generateMatrix(null, 2020)
    console.log(this.calendar)
    this.isLoading = false
  }
}
