import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import * as pSBC from '../service/pSBC';
import { CalendarConfig } from '../service/models';

@Component({
  selector: 'calendar-panels',
  templateUrl: './calendar-panels.component.html',
  styleUrls: ['./calendar-panels.component.scss']
})
export class CalendarPanelsComponent implements OnInit {

  private _mode;
  private _data = null;
  calendar = null

  get mode(): string {
    return this._mode;
  }
  get data(): any {
    return this._data;
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
  };

  @Input() placeholderDay: boolean = false;
  @Input() year: number = new Date().getFullYear()
  @Input() month: number = new Date().getUTCMonth();
  @Input() monthsBefore: number = 1;
  @Input() monthsAfter: number = 1;
  @Input() config: CalendarConfig = {
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

  isLoading = true

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

  generateX() {
    if (this.mode === 'annual') {
      this.calendar = this.calendarService.generateMatrix(this.mode, this.config.calendarWeek, null, this.year)
    } else if (this.mode === 'monthly') {
      console.log(this.month)
      this.calendar = this.calendarService.generateMatrix(this.mode, this.config.calendarWeek, null, this.year, this.month, this.monthsBefore, this.monthsAfter)
    }
    console.log(this.calendar)
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
