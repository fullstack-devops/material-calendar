# Material Calendar
Please read this **before** usage!
This material calendar is just beginning. As in the angular material components, a beautiful calendar is to be generated by simple integration. Cooperation is welcome.

> Warning: during the migration to github parts of the project were mixed up !!
All features can be lost after an update from 2.1.2 to> 2.1.2.
This will be solved in version 3.0.0, which will come as soon as I can.
From version 3.0.0 onwards there will be a stable API with extensive features and its own documentation

### Working demo
[demo github project](https://github.com/eksrvb/material-calendar-demo)

If you want to give me feedback and don't want to open an issue on github, please fill out the [form](https://forms.gle/W9TygXf65Yru3VHi7)

![material-calendar-single-month](https://github.com/eksrvb/material-calendar/raw/main/docs/material-calendar-single-month.png)
![material-calendar-three-months](https://github.com/eksrvb/material-calendar/raw/main/docs/material-calendar-three-months.png)
![material-calendar-two-months-with-placeholder](https://github.com/eksrvb/material-calendar/raw/main/docs/material-calendar-two-months-with-placeholder.png)

## Installing
`npm i material-calendar`

## Usage
app.module.ts
``` typescript
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule, LOCALE_ID } from  '@angular/core';

import { AppComponent } from  './app.component';
import { MaterialCalendarModule } from  'material-calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialCalendarModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
import the  `MaterialCalendarModule` and optional provide your location.
In my case: `{provide:  LOCALE_ID, useValue:  'de-DE' }`

In your html:
``` html
<calendar-panel
	placeholderDay="true"
	year="2020"
	month="10"
	monthsBefore="1"
	monthsAfter="2"
	[dataSource]="dataSource"
	[config]="calendarConfig"
	(clickDate)="testMethod($event)">
   </calendar-panel>
   <!--
	default placeholderDay = false   override: boolean
	default year = current year      override: year to start (number)
	default month = current month    override: month to start (number)
	default monthsBefore = 0         
	default monthsAfter = 0
	dataSource                       your custom dataSource
	config                           insert your configuration
	clickDate                        recive an click event from the component
    -->
```

``` typescript
import { CalendarConfig, DayC } from  'material-calendar';

placeholder = false  // boolean

calendarConfig: CalendarConfig = {
	calendarConfig: CalendarConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'range',  // 'click' | 'range'
    displayYear: false,
    firstDayOfWeekMonday: true,
    calendarWeek: true,
    switches: true,
  }
}

dataSource: DayC[] = [
  {
    date: 1604185200000,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    toolTip: 'Test ToolTip',
    badgeMode: 'Icon',
    badgeInt: 5,
    badgeIcon: 'edit'
  },
  {
    date: 1604199900000,
    backgroundColor: 'blue'
  }
]
```


## Features

- generate a nice calendar in material design
- get a date back with the annotation "clickDate" (see example)
- insert your own calendar data and render the new template
- multiselect days optional (returns the daily span)

## Code scaffolding

For code scaffolding, the project can be checked out from the public repository and pull requests can be made.

## Build


Run `ng build material-calendar` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build material-calendar`, go to the dist folder `cd dist/material-calendar` and run `npm publish`.

  

## Running unit tests

  

Run `ng test material-calendar` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Further help
For feature requests or problems, please open a ticket in the issue tracker.
