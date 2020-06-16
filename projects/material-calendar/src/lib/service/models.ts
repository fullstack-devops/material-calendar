export interface CalendarConfig {
    autoTextColor: boolean;
    textColor?: string;
    panelBgColor?: string;
    panelColor?: string;
    useHolidays: boolean;
    holidayColor?: string;
    holidayTextColor?: string;
    displayYear: boolean;
    calendarWeek: boolean;
    switches: boolean;
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
export interface Day {
    day: number;
    date: Date;
    kw: number;
    isWeekendDay: boolean;
    isHoliday: boolean;
}