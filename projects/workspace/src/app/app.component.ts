import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarConfig, Day } from 'projects/material-calendar/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Material Calendar Demo';

  // Theming
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  placeholder = false // boolean
  isLoading = true
  latestEvent: Object | undefined

  monthsAfterBefore = Array(5).fill(0).map((x, i) => i);
  monthsBefore = 2;
  monthsAfter = 0;

  calendarConfig: CalendarConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'range',  // 'click' | 'range'
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: false,
    switches: true,
    panelWidth: '300px',
    bluredDays: false, // default: false
    markWeekend: true // default: true
  }

  dataSource: Day[] = [
    {
      date: new Date(1634594400000),
      backgroundColor: '#0167c7',
      toolTip: 'Test ToolTip First',
      dayNumber: ''
    },
    {
      date: new Date(1634594400000),
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip Second',
      dayNumber: ''
    },
    {
      date: new Date(1634853600000),
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip 2',
      dayNumber: ''
    },
    {
      date: new Date(1635544800000),
      backgroundColor: 'lightblue',
      dayNumber: ''
    }
  ]

  constructor(private overlay: OverlayContainer) { }
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });

    console.log(this.dataSource)
    this.isLoading = false
  }

  testMethod(event: Object) {
    this.latestEvent = event;
    console.log(event)
  }
}
