import { Component, OnInit, HostBinding } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import * as pSBC from '../service/pSBC';

interface Config {
  textColor: string;
  panelBgColor?: string;
  panelColor?: string;
  holidayBgColor?: string;
  holidayColor?: string;
}
interface Display {
  year: number;
  month: number;
  before?: number;
  after?: number;
  displayYear: boolean;
  switches: boolean;
}

@Component({
  selector: 'calendar-panels',
  inputs: ['placeholderDay', 'config', 'display'],
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
    holidayColor: 'rgb(0, 103, 127)'
  }
  display: Display = {
    year: 2020,
    month: 3,
    displayYear: true,
    switches: true
  }


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
    this.panelBgColor = this.config.panelBgColor
  }

  calendar = null
  weekdayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  ngOnInit() {
    console.log(this.placeholderDay)
    this.calendar = this.calendarService.generateMatrix(2020, this.placeholderDay)
    console.log(this.calendar)
    this.isLoading = false
  }
}
