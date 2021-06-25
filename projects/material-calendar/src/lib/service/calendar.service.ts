import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import * as moment from 'moment';
import 'moment/min/locales';
import { Calendar, Month, Day, DayC } from './models';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  momentLoc = moment.updateLocale(this.locale.substr(0, 2), {
    week: {
      dow: 1, // First day of week is Monday
      doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
    }
  });
  monthNames = this.momentLoc.monthsShort()
  dayNamesEn = this.momentLoc.weekdaysShort()
  dayNamesDeVor = JSON.parse(JSON.stringify(this.dayNamesEn))
  dayNamesDe = this.dayNamesDeVor.push(this.dayNamesDeVor.shift())

  dataSourceCustom: DayC[] = null
  daysAbsolute: number[] = []

  /**
   * @param {String}     mode             calendar mode (monthly|annual)
   * @param {boolean}    calendarWeek     Display calendar week
   * @param {DayCustom}  dataSource       Custom dates, Model 'DayCustom'
   * @param {Number}     year             Gerarate calender for one year
   * @param {Number}     currMonth        current selected month
   * @param {Number}     monthsBefore     months before the selected month, default 0
   * @param {Number}     monthsAfter      months after the selected month, default 0
  */
  generateMatrix(mode: string, calendarWeek: boolean, dataSource?: DayC[], year?: number, currMonth?: number, monthsBefore?: number, monthsAfter?: number) {
    let cal;
    this.daysAbsolute = []
    this.dataSourceCustom = dataSource
    monthsAfter = monthsAfter ? parseInt(monthsAfter.toString(), 10) : monthsAfter
    monthsBefore = monthsBefore ? parseInt(monthsBefore.toString(), 10) : monthsBefore
    currMonth = currMonth ? parseInt(currMonth.toString(), 10) : currMonth
    // Standard calendar
    if (mode === 'monthly') {
      const months: Month[] = []
      months.push(this.generateMonth(currMonth, year))
      for (let index = 0; index < monthsBefore; index++) {
        const calculatedMonth = currMonth - monthsBefore + index
        const actualYear = (calculatedMonth + 1 < 1) ? year - 1 : year
        const actualMonth = (calculatedMonth + 1 < 1) ? 12 + calculatedMonth : calculatedMonth
        months.splice(index, 0, this.generateMonth(actualMonth, actualYear))
      }
      for (let index = 0; index < monthsAfter; index++) {
        const calculatedMonth = currMonth + index + 1
        const actualYear = (calculatedMonth > 11) ? year + 1 : year
        const actualMonth = (calculatedMonth > 11) ? calculatedMonth - 12 : calculatedMonth
        months.push(this.generateMonth(actualMonth, actualYear))
      }
      cal = {
        months: months,
        dayNames: this.dayNamesDeVor,
        year: year
      }
    } else {
      // Calendar is a full year
      cal = this.generateCal(year)
    }

    cal.months.forEach((month, index) => {
      month.days.forEach(day => {
        Object.assign(day, { type: 'date' })
      })
      let render = month.days
      const firstMonthDay = month.days[0]
      let currMonth = moment(month.days[0].date)
      const dayOfWeek = currMonth.day() == 0 ? 7 : currMonth.day()
      const nextMonth = moment(currMonth.add(1, 'M')['_d'])
      const nextMonthDay: Day = this.generateDay(new Date(nextMonth.toDate()))
      // Vormonat
      for (let i = 0; i < dayOfWeek - 1; i++) {
        render.splice(i, 0, this.makeWJObjekt(firstMonthDay, 'placeholderDay', (dayOfWeek - 1) - i));
      }
      // Nachmonat
      for (let i = 0; render.length < 42; i--) {
        render.splice(render.length + 1, 0, this.makeWJObjekt(nextMonthDay, 'placeholderDay', i));
      }
      // Kalenderwochen && tr rows
      let renderTr = []
      if (calendarWeek) {
        render.splice(0, 0, this.makeWJObjekt(render[0], "kw"));
        render.splice(8, 0, this.makeWJObjekt(render[8], "kw"));
        render.splice(16, 0, this.makeWJObjekt(render[16], "kw"));
        render.splice(24, 0, this.makeWJObjekt(render[24], "kw"));
        render.splice(32, 0, this.makeWJObjekt(render[32], "kw"));
        render.splice(40, 0, this.makeWJObjekt(render[40], "kw"));
        renderTr.push(render.slice(0, 8))
        renderTr.push(render.slice(8, 16))
        renderTr.push(render.slice(16, 24))
        renderTr.push(render.slice(24, 32))
        renderTr.push(render.slice(32, 40))
        renderTr.push(render.slice(40, 48))
      } else {
        renderTr.push(render.slice(0, 7))
        renderTr.push(render.slice(7, 14))
        renderTr.push(render.slice(14, 21))
        renderTr.push(render.slice(21, 28))
        renderTr.push(render.slice(28, 35))
        renderTr.push(render.slice(35, 42))
      }

      Object.assign(month, { render: renderTr })
      Object.assign(cal, { daysAbsolute: this.daysAbsolute })
      delete month.days
    });
    return cal;
  }

  makeWJObjekt(day: Day, type: string, dateBack?: number) {
    let newDay = null
    if (dateBack) {
      newDay = moment(day.date).subtract(dateBack, 'days')
    } else {
      newDay = moment(day.date)
    }
    let result
    switch (type) {
      case 'kw':
        result = {
          kw: day.kw,
          type: 'kw'
        }
        break;
      case 'placeholderDay':
        result = {
          kw: newDay.week(),
          type: 'placeholderDay',
          day: newDay.date(),
          isWeekendDay: this.isWeekend(new Date(newDay))
        }
        break;
    }
    return result
  }

  generateCal(year: number): Calendar {
    const months = []
    for (let index = 0; index < this.monthNames.length; index++) {
      months.push(this.generateMonth(index, year))
    }
    return {
      year: year,
      dayNames: this.dayNamesDeVor,
      months: months
    }
  }

  generateMonth(monthNumber, year) {
    const daysInMonth = moment(`${year}-${monthNumber + 1}`, "YYYY-MM").daysInMonth()
    const days: Day[] = [];
    for (let index = 0; index < daysInMonth; index++) {
      const currentDay = new Date(year, monthNumber, (index + 1))
      days.push(this.generateDay(currentDay))
    }
    return {
      name: this.monthNames[monthNumber],
      year: year,
      days: days
    }
  }

  generateDay(currentDay: Date): Day {
    let tmpDay = JSON.parse(JSON.stringify(this.dataSourceCustom))
    let day

    if (tmpDay != null) {
      // Filter nach vorhandenem override
      const filter = tmpDay.filter(obj => obj.date === currentDay.setHours(0, 0, 0, 0))
      if (filter.length > 0) {
        let backgroundColor = ''
        let toolTip = ''
        switch (filter.length) {
          case 2:
            backgroundColor = `linear-gradient(110deg, ${filter[0].backgroundColor} 49%, ${filter[1].backgroundColor} 51%)`
            toolTip = `${filter[0].toolTip} \n ${filter[1].toolTip}`
            break;
          case 3:
            backgroundColor = `linear-gradient(110deg,
                ${filter[0].backgroundColor}, ${filter[0].backgroundColor} 31%,
                ${filter[1].backgroundColor} 32%, ${filter[1].backgroundColor} 65%,
                ${filter[2].backgroundColor} 66%)`
            toolTip = `${filter[0].toolTip} \n ${filter[1].toolTip} \n ${filter[2].toolTip}`
            break;
          case 4:
            backgroundColor = `linear-gradient(110deg,
              ${filter[0].backgroundColor}, ${filter[0].backgroundColor} 24%,
              ${filter[1].backgroundColor} 26%, ${filter[1].backgroundColor} 49%,
              ${filter[2].backgroundColor} 51%, ${filter[2].backgroundColor} 74%,
              ${filter[3].backgroundColor} 76%)`
            toolTip = `${filter[0].toolTip} \n ${filter[1].toolTip} \n ${filter[2].toolTip} \n ${filter[3].toolTip}`
            break;
          default:
            backgroundColor = filter[0].backgroundColor
            toolTip = filter[0].toolTip
            break;
        }
        day = filter[0]
        day.backgroundColor = backgroundColor
        day.toolTip = toolTip
        day.kw = moment(currentDay).week()
        day.date = currentDay.setHours(0, 0, 0, 0)
        day.day = currentDay.getDate()
        day.isWeekendDay = this.isWeekend(currentDay)
      } else {
        day = {
          kw: moment(currentDay).week(),
          day: currentDay.getDate(),
          date: currentDay.setHours(0, 0, 0, 0),
          isWeekendDay: this.isWeekend(currentDay)
        }
      }
    } else {
      day = {
        kw: moment(currentDay).week(),
        day: currentDay.getDate(),
        date: currentDay.setHours(0, 0, 0, 0),
        isWeekendDay: this.isWeekend(currentDay)
      }
    }
    this.daysAbsolute.push(currentDay.setHours(0, 0, 0, 0))
    return day
  }

  isWeekend(date: Date): boolean {
    return parseInt(moment(date).format('E'), 0) > 5
  }
}
