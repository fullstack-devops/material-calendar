import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { CalendarConfig, DayC } from '../service/models';

@Component({
  selector: 'calendar-panel',
  templateUrl: './calendar-panels.component.html',
  styleUrls: ['./calendar-panels.component.scss','./calendar-panels.component-theme.scss']
})
export class CalendarPanelComponent implements OnInit {

  private _config: CalendarConfig = {
    renderMode: 'monthly',
    selectMode: 'click',
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: false,
    switches: true,
    bluredDays: false,
    markWeekend: true,
    panelWidth: '350px'
  };
  private _mode: string;
  private _dataSource: DayC[] = null;
  private _month = new Date().getUTCMonth();
  private _year: number = new Date().getFullYear()
  private _monthsBefore: number = 0;
  private _monthsAfter: number = 0;

  calendar = null
  today = new Date().setHours(0, 0, 0, 0)
  selectedDayStart: number = 0
  selectedDayBetween: number[] = []
  selectedDayEnd: number = 0
  isLoading = true
  monthOverrride = false

  weekendColor = 'rgba(0, 0, 0, .25)'

  get config() {
    return this._config;
  }
  get mode(): string {
    return this._mode;
  }
  get dataSource(): DayC[] {
    return this._dataSource;
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
  set dataSource(data: DayC[]) {
    this._dataSource = data;
    this.generateX()
  }
  @Input()
  set mode(val: string) {
    this._mode = val;
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

  @Output() public clickDate = new EventEmitter<Object>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.selectedDayBetween = []
      this.selectedDayStart = 0
      this.selectedDayEnd = 0
    }
  }

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.isLoading = false
  }

  onClick(day, type) {
    if (type == 'date' && this.config.selectMode == 'range') {
      if (this.selectedDayStart != 0 && this.selectedDayEnd != 0) {
        this.selectedDayBetween = []
        this.selectedDayStart = 0
        this.selectedDayEnd = 0
      }
      if (this.selectedDayStart > day.date || this.selectedDayStart === 0) {
        this.selectedDayStart = day.date
      } else {
        this.selectedDayEnd = day.date
        this.clickDate.emit(
          {
            mode: 'range',
            startDay: this.selectedDayStart,
            endDay: this.selectedDayEnd,
            effectedDays: [this.selectedDayStart, ...this.selectedDayBetween]
          }
        );
      }
    } else {
      this.clickDate.emit({ mode: 'click', day: day });
    }
  }

  onMouseOver(dateComp) {
    if (this.selectedDayStart != 0 && this.selectedDayEnd == 0) {
      this.selectedDayBetween = this.calendar.daysAbsolute.filter(date => date <= dateComp && date > this.selectedDayStart)
      const fIndex = this.selectedDayBetween.indexOf(dateComp)
      if (fIndex === this.selectedDayBetween.length - 1) {
        return true
      } else {
        return false
      }
    }
  }

  getAmIBetween(date) {
    const fIndex = this.selectedDayBetween.indexOf(date)
    if (fIndex != -1) {
      if (this.selectedDayBetween.length === fIndex + 1) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  getCanIBeHighlighted(date) {
    if (this.selectedDayStart != 0 && this.selectedDayEnd != 0 && this.getAmIBetween(date)
      || (this.selectedDayStart === date && this.selectedDayEnd != 0)
      || (this.selectedDayEnd === date && this.selectedDayStart != 0)) {
        return true
      } else {
        return false
      }
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
    this.calendar = this.calendarService.generateMatrix(this.config.renderMode, this.config.calendarWeek, this.dataSource, usedYear, usedMonth, this.monthsBefore, this.monthsAfter)
  }

}
