---
layout: default
title: EXAMPLES
nav_order: 3
---

# Configuration

{: .no_toc }

<details open markdown="block">
  <summary>

    Table of contents

  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

You can operate the material calendar in two different modes.

The first and most common is the [monthly](/configuration/monthly) Mode. The second is an [annual](/configuration/annual) mode that shows every 12 months of the year.

In addition to this modes, there is also a basic configuration, as shown below.

## Bacis Installation of material-calendar

import the `MaterialCalendarModule` and optional provide your location.<br>
In my case: `{provide:  LOCALE_ID, useValue:  'de-DE' }`

File: app.module.ts

```typescript
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule, LOCALE_ID } from  '@angular/core';

import { AppComponent } from  './app.component';
import { MaterialCalendarModule } from  'material-calendar'; // <-- add this line

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialCalendarModule // <-- add this line
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE' } // <-- add this line (depending on your location)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In your html:

```html
<calendar-panel></calendar-panel>
```

and you are good to go ; )

All options are shown here:

```html
<calendar-panel [placeholderDay]="placeholder" [dataSource]="dataSource" year="2021" month="5" [monthsBefore]="monthsBefore" [monthsAfter]="monthsAfter" [config]="calendarConfig" (clickDate)="testMethod($event)">
</calendar-panel>
<!--
	default placeholderDay = false
	default year = current year
	default month = current month
	default monthsBefore = 1
	default monthsAfter = 1
-->
```

> Note: the values entered here are default values

```typescript
import { CalendarConfig } from  'material-calendar';

placeholder = false  // boolean ...can be hardcoded in html

calendarConfig: CalendarConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'click',  // 'click' | 'range'
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: false,
    switches: true,
    bluredDays: false,
    markWeekend: true,
    panelWidth: '350px'
};
```
