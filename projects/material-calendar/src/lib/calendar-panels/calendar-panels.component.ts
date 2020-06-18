import { Component, OnInit, HostBinding, Input, Output } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import * as pSBC from '../service/pSBC';
import { CalendarConfig } from '../service/models';

@Component({
  selector: 'calendar-panels',
  templateUrl: './calendar-panels.component.html',
  styleUrls: ['./calendar-panels.component.scss']
})
export class CalendarPanelsComponent implements OnInit {

  private _mode: string;
  private _config: CalendarConfig = {
    panelBgColor: '#00677f', // 00677f 006105
    autoTextColor: true,
    textColor: '#fff',
    useHolidays: false,
    holidayColor: 'rgb(253, 173, 0)',
    holidayTextColor: 'rgb(253, 173, 0)',
    displayYear: true,
    firstDayOfWeekMonday: true,
    todayColor: '#fff',
    calendarWeek: true,
    switches: false,
  };
  private _data = null;
  private _month = new Date().getUTCMonth();
  private _year: number = new Date().getFullYear()
  private _monthsBefore: number = 1;
  private _monthsAfter: number = 1;

  calendar = null
  today = new Date().setHours(0, 0, 0, 0)

  get mode(): string {
    return this._mode;
  }
  get config(): CalendarConfig {
    return this._config;
  }
  get data(): any {
    return this._data;
  }
  get month(): number {
    return this._month;
  }
  get year(): number {
    return this._year;
  }
  get monthsBefore(): number {
    return this._monthsBefore;
  }
  get monthsAfter(): number {
    return this._monthsAfter;
  }

  @Input()
  set mode(val: string) {
    this._mode = val;
    this.generateX()
  }
  @Input()
  set data(data: any) {
    this._data = data;
    this.generateX()
  }
  @Input()
  set month(data: number) {
    this._month = data;
    this.monthOverrride = false
    this.generateX()
  }
  @Input()
  set config(data: CalendarConfig) {
    this._config = data;
    this.generateX()
  }
  @Input()
  set year(data: number) {
    this._year = data;
    this.generateX()
  }
  @Input()
  set monthsBefore(data: number) {
    this._monthsBefore = data;
    this.generateX()
  }
  @Input()
  set monthsAfter(data: number) {
    this._monthsAfter = data;
    this.generateX()
  }

  @Input() placeholderDay: boolean = false;

  isLoading = true
  monthOverrride = false

  @HostBinding("style.--panel-color")
  panelBgColor = this.config.panelBgColor;
  @HostBinding("style.--panel-color-darker")
  panelBgColorDarker = pSBC.pSBC(-0.4, this.panelBgColor);
  @HostBinding("style.--panel-color-lighter")
  panelBgColorLighter = pSBC.pSBC(0.3, this.lightOrDarkTextColor(this.panelBgColor));
  @HostBinding("style.--text-color")
  panelColor = this.lightOrDarkTextColor(this.panelBgColor);
  @HostBinding("style.--panel-color-holiday")
  panelBgColorHoliday = this.config.holidayColor;
  @HostBinding("style.--text-color-holiday")
  panelColorHoliday = this.lightOrDarkTextColor(this.config.holidayColor);
  @HostBinding("style.--today-color")
  todayColor = this.config.todayColor;

  constructor(private calendarService: CalendarService) {
    // colors
    this.panelBgColor = this.config.panelBgColor;
    this.panelBgColorDarker = pSBC.pSBC(-0.4, this.panelBgColor);
    this.panelBgColorHoliday = this.config.holidayColor;
    if (this.config.autoTextColor) {
      this.panelColor = this.lightOrDarkTextColor(this.panelBgColor);
      this.panelColorHoliday = this.lightOrDarkTextColor(this.config.holidayColor);
    } else {
      this.panelColor = this.config.textColor;
      this.panelColorHoliday = this.config.holidayTextColor;
    }
  }

  ngOnInit() {
    if (this.monthsBefore > 10) {
      console.error('monthsBefore should not be greater than 10, this could result in errors!')
    }
    if (this.monthsAfter > 10) {
      console.error('monthsBefore should not be greater than 10, this could result in errors!')
    }
    this.isLoading = false
  }

  onMonthForward() {
    this.monthOverrride = true
    if (this.month >= 11 || this._month >= 11) {
      this._year = parseInt(this.year.toString(), 10) + 1
      this._month = 0
    } else {
      this._month = parseInt(this._month.toString(), 10) + 1
    }
    this.generateX()
  }

  onMonthBackward() {
    this.monthOverrride = true
    if (this.month <= 0 || this._month <= 0) {
      this._year = parseInt(this.year.toString(), 10) - 1
      this._month = 11
    } else {
      this._month = parseInt(this._month.toString(), 10) - 1
    }
    this.generateX()
  }

  generateX() {
    const usedYear = this.monthOverrride ? this._year : this.year
    const usedMonth = this.monthOverrride ? this._month : this.month
    if (this.mode === 'annual') {
      this.calendar = this.calendarService.generateMatrix(this.mode, this.config.calendarWeek, null, this.year)
    } else if (this.mode === 'monthly') {
      this.calendar = this.calendarService.generateMatrix(this.mode, this.config.calendarWeek, null, usedYear, usedMonth, this.monthsBefore, this.monthsAfter)
    }
    // console.log(this.calendar)
  }

  lightOrDarkTextColor(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If RGB --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    }
    else {
      // If hex --> Convert it to RGB: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return '#000000';
    }
    else {
      return '#ffffff';
    }
  }
}
