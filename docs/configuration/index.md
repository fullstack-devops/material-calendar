---
layout: default
title: Configuration
nav_order: 2
has_children: true
permalink: /docs/configuration
---

# Configuration


You can operate the material calendar in two different modes.

The first and most common is the [monthly](https://eksrvb.github.io/material-calendar/configuration/monthly) Mode. The second is an [annual](https://eksrvb.github.io/material-calendar/configuration/annual) mode that shows every 12 months of the year.

In addition to this modes, there is also a basic configuration, as shown below.

## Bacis Installation of material-calendar

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
<calendar-panels></calendar-panels>
```
and you are good to go ;)

All options are shown here:

``` html
<calendar-panels
	[mode]="mode"
	[placeholderDay]="placeholder"
	year="2020"
	month="3" 
	monthsBefore="1"
	monthsAfter="1"
	[config]="calendarConfig"
	(clickDate)="yourMethod($event)">
</calendar-panels>
<!--
	default mode = monthly
	default placeholderDay = false
	default year = current year
	default month = current month
	default monthsBefore = 1
	default monthsAfter = 1
-->
```
``` typescript
import { CalendarConfig } from  'material-calendar';

placeholder = false  // boolean ...can be hardcoded in html
mode = 'monthly'  // 'annual' | 'monthly' ...can be hardcoded in html

calendarConfig: CalendarConfig = {
	panelBgColor:  '#00677f', // use only hex or rbg colors
	autoTextColor:  true,
	textColor:  '#fff', // use only hex or rbg colors
	displayYear: true,
    firstDayOfWeekMonday: true,
    todayColor: '#fff',
    panelWidth: '100%', // can also be fix values such as 350px
    calendarWeek: true,
    switches: false,
}
```
``` javascript
/**
* @param  {boolean}  autoTextColor Sets the text color automatically, based on the backgroud colors
* @param  {boolean}  calendarWeek display the calendar week
* @param  {boolean}  displayYear displays the year next to the Month name
* @param  {boolean}  switches display switches in calendar component or not
* @param  {string}   panelBgColor sets the background color of the panel
* @param  {string}   textColor if autoTextColor false this must be set to a custom color
*
*/
```