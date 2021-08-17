import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarConfig, DayC } from 'projects/material-calendar/src/public-api';

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
  latestEvent = ""

  monthsAfterBefore = Array(5).fill(0).map((x, i) => i);
  monthsBefore = 1;
  monthsAfter = 1;

  calendarConfig: CalendarConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'range',  // 'click' | 'range'
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: true,
    switches: true,
    panelWidth: '300px'
  }

  dataSource: DayC[] = [
    {
      date: 1624312800000,
      backgroundColor: '#0167c7',
      toolTip: 'Test ToolTip',
      badgeMode: 'Icon',
      badgeInt: 5,
      badgeIcon: 'edit'
    },
    {
      date: 1624312800000,
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip',
      badgeMode: 'Icon',
      badgeInt: 5,
      badgeIcon: 'edit'
    },
    {
      date: 1624658400000,
      backgroundColor: 'rgb(6, 182, 0)',
      toolTip: 'Test ToolTip 2',
      /* badgeMode: 'Icon',
      badgeInt: 5,
      badgeIcon: 'edit' */
    },
    {
      date: 1604199900000,
      backgroundColor: 'blue'
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

  testMethod(event) {
    this.latestEvent = event;
    console.log(event)
  }
}
