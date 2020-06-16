import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import * as moment from 'moment-feiertage';
import business from 'moment-business';
import 'moment/min/locales';
import { Calendar, Month, Day } from './models';

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

  /**
   * @param {Calendar} calendar         Custom data, (optinal)
   * @param {Number}   year             Gerarate calender for one year, (optinal)
   * @param {Number}   currMonth        current selected month, (optinal)
   * @param {Number}   monthsBefore     months before the selected month, (optinal) default 0
   * @param {Number}   monthsAfter      months after the selected month, (optinal) default 0
  */
  generateMatrix(calendarWeek: boolean, calendar?: Calendar, year?: number, currMonth?: number, monthsBefore?: number, monthsAfter?: number) {
    let cal;
    // Custom calendar data?
    if (calendar != undefined || calendar != null) {
      console.log('Custom Calendar!!')
      cal = calendar
    } else {
      // Standard calendar
      if ((currMonth + 1) > 0) {
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
          dayNames: this.momentLoc.weekdaysShort(),
          year: year
        }
      } else {
        // Calendar is a full year
        cal = this.generateCal(year)
      }
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
      const nextMonthDay: Day = {
        kw: nextMonth.week(),
        day: nextMonth.day(),
        date: nextMonth.toDate(),
        isWeekendDay: business.isWeekendDay(moment(nextMonth)),
        isHoliday: nextMonth.isHoliday([])['allStates']
      }
      // Vormonat
      for (let i = 0; i < dayOfWeek - 1; i++) {
        render.splice(i, 0, this.makeWJObjekt(firstMonthDay, 'placeholderDay', (dayOfWeek - 1) - i));
      }
      // Nachmonat
      for (let i = 0; render.length < 42; i--) {
        render.splice(render.length + 1, 0, this.makeWJObjekt(nextMonthDay, 'placeholderDay', i));
      }
      // Kalenderwochen
      if (calendarWeek) {
        render.splice(0, 0, this.makeWJObjekt(render[0], "kw"));
        render.splice(8, 0, this.makeWJObjekt(render[8], "kw"));
        render.splice(16, 0, this.makeWJObjekt(render[16], "kw"));
        render.splice(24, 0, this.makeWJObjekt(render[24], "kw"));
        render.splice(32, 0, this.makeWJObjekt(render[32], "kw"));
        render.splice(40, 0, this.makeWJObjekt(render[40], "kw"));
      }

      Object.assign(month, { render: render })
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
          isWeekendDay: business.isWeekendDay(moment(newDay)),
          isHoliday: moment(newDay).isHoliday([])['allStates']
        }
        break;
    }
    return result
  }

  generateCal(year: number): Calendar {
    //if ()
    const months = []
    for (let index = 0; index < this.monthNames.length; index++) {
      months.push(this.generateMonth(index, year))
    }
    return {
      year: year,
      dayNames: this.momentLoc.weekdaysShort(),
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

  generateDay(currentDay): Day {
    return {
      kw: moment(currentDay).week(),
      day: currentDay.getDate(),
      date: currentDay,
      isWeekendDay: business.isWeekendDay(moment(currentDay)),
      isHoliday: moment(currentDay).isHoliday([])['allStates']
    }
  }
}
