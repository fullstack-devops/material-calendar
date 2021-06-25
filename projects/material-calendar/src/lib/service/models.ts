/**
 * @param {string}    renderMode              choose render mode ('annual' or 'monthly')
 * @param {string}    selectMode              choose select mode ('click' or 'range')
 * @param {boolean}   calendarWeek            display the calendar week
 * @param {boolean}   displayYear             displays the year next to the Month name
 * @param {boolean}   switches                show arrows to navigate an month forward or backwards
 * @param {boolean}   bluredDays              make an circle around the number of the day
 * @param {boolean}   markWeekend             highlight weekends
 * @param {boolean}   firstDayOfWeekMonday    set first day of week (monday or sunday)
 * @param {string}    panelWidth              set a with for an single panel
 */
export interface CalendarConfig {
    renderMode: string;
    selectMode: string;
    calendarWeek?: boolean;
    displayYear?: boolean;
    switches?: boolean;
    bluredDays?: boolean;
    markWeekend?: boolean;
    firstDayOfWeekMonday?: boolean;
    panelWidth?: string;
}

export interface Calendar {
    year: number;
    dayNames: String[];
    months: Month[];
}
export interface Month {
    name: string;
    days: Day[]
}

/**
   * Use this to customize your data in the calendar
   * @param {Date}     date             Date to match
   * @param {string}   color            set a custom color (hex, string, or var)
   * @param {string}   backgroundColor  set a custom Background Color (hex, string, or var)
   * @param {string}   badgeMode        badgeMode options: 'Int' or 'Icon'
   * @param {number}   badgeInt         if badgeMode == 'Int', set our Number here
   * @param {string}   badgeIcon        if badgeMode == 'Icon', set Icon (Matireal-Icons)
   * @param {string}   toolTip          if set, this displays a mat-tooltip
  */
export interface DayC {
    date: number;
    color?: string;
    backgroundColor?: string;
    badgeMode?: string;
    badgeInt?: number;
    badgeIcon?: string;
    toolTip?: string;
    [propName: string]: any;
}

/**
   * Use this to customize your data in the calendar
   * @param {number}   day              number of day (override not allowed)
   * @param {Date}     date             Date to match
   * @param {number}   kw               calendar week (override not allowed)
   * @param {boolean}  isWeekendDay     Boolean if day weekend (override not allowed)
   * @param {string}   color            set a custom color (hex, string, or var)
   * @param {string}   backgroundColor  set a custom Background Color (hex, string, or var)
   * @param {boolean}  badge            if you want to use a Badge
   * @param {string}   badgeMode        badgeMode options: 'Int' or 'Icon'
   * @param {number}   badgeInt         if badgeMode == 'Int', set our Number here
   * @param {string}   badgeIcon        if badgeMode == 'Icon', set Icon (Matireal-Icons)
   * @param {string}   toolTip          if set, this displays a mat-tooltip
  */
export interface Day {
    day: number;
    date: number;
    kw: number;
    isWeekendDay: boolean;
    color?: string;
    backgroundColor?: string;
    badge?: boolean;
    badgeMode?: string;
    badgeInt?: number;
    badgeIcon?: string;
    toolTip?: string;
}
