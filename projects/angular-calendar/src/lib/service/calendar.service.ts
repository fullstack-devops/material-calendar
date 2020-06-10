import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import * as moment from 'moment-feiertage';
import business from 'moment-business';
import 'moment/min/locales';

interface Calendar {
  year: number;
  months: Month[]
}
interface Month {
  name: string;
  days: Day[]
}
interface Day {
  day: number;
  date: Date;
  kw: number;
  isWeekendDay: boolean;
  isHoliday: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  longMonths = [1, 3, 5, 7, 8, 10, 12]

  momentLoc = moment.updateLocale(this.locale.substr(0, 2), {
    week: {
      dow: 1, // First day of week is Monday
      doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
    }
  });

  weekdayNames = this.momentLoc.weekdaysShort().push(this.momentLoc.weekdaysShort().shift())

  // weekdayNames = this.weekdaysShort.push(this.weekdaysShort.shift());
  monthNames = this.momentLoc.monthsShort()

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
      case 'leer':
        result = {
          kw: newDay.week(),
          type: 'leer',
          day: newDay.date(),
          isWeekendDay: business.isWeekendDay(moment(newDay)),
          isHoliday: moment(newDay).isHoliday([])['allStates']
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

  /**
  * @param {Calendar} calendar     Monat von 1 bis 12
  */
  generateMatrix(year: number, placeholderDay?: boolean, calendar?: Calendar) {
    console.log(placeholderDay)
    let emptyOrPlaceholder = 'placeholderDay'
    if (placeholderDay === true) {
      emptyOrPlaceholder = 'placeholderDay'
    }
    console.log(emptyOrPlaceholder)

    let cal = calendar;
    if (!calendar) {
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
      const nextMonthDay: Day = {
        kw: nextMonth.week(),
        day: nextMonth.day(),
        date: nextMonth.toDate(),
        isWeekendDay: business.isWeekendDay(moment(nextMonth)),
        isHoliday: nextMonth.isHoliday([])['allStates']
      }
      // Vormonat
      for (let i = 0; i < dayOfWeek - 1; i++) {
        render.splice(i, 0, this.makeWJObjekt(firstMonthDay, emptyOrPlaceholder, (dayOfWeek - 1) - i));
      }
      // Nachmonat
      for (let i = 0; render.length < 42; i--) {
        render.splice(render.length + 1, 0, this.makeWJObjekt(nextMonthDay, emptyOrPlaceholder, i));
      }
      // Kalenderwochen
      render.splice(0, 0, this.makeWJObjekt(render[0], "kw"));
      render.splice(8, 0, this.makeWJObjekt(render[8], "kw"));
      render.splice(16, 0, this.makeWJObjekt(render[16], "kw"));
      render.splice(24, 0, this.makeWJObjekt(render[24], "kw"));
      render.splice(32, 0, this.makeWJObjekt(render[32], "kw"));
      render.splice(40, 0, this.makeWJObjekt(render[40], "kw"));

      Object.assign(month, { render: render })
      delete month.days
    });
    return cal;
  }

  generateCal(year: number): Calendar {
    return {
      year: year,
      months: this.generateMonth(year)
    }
  }

  generateMonth(year) {
    console.log(this.momentLoc)
    const calendar: Month[] = []
    for (let index = 0; index < this.monthNames.length; index++) {
      calendar.push({
        name: this.monthNames[index],
        days: this.generateDay(index, year)
      })
    }

    return calendar
  }

  generateDay(monthNumber: number, yearNumber: number) {
    const daysInMonth = moment(`${yearNumber}-${monthNumber + 1}`, "YYYY-MM").daysInMonth()
    const month: Day[] = [];
    for (let index = 0; index < daysInMonth; index++) {
      const curDay = new Date(yearNumber, monthNumber, (index + 1))
      month.push({
        kw: moment(curDay).week(),
        day: curDay.getDate(),
        date: curDay,
        isWeekendDay: business.isWeekendDay(moment(curDay)),
        isHoliday: moment(curDay).isHoliday([])['allStates']
      })
    }
    return month
  }
}
