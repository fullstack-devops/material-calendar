---
layout: default
title: API
nav_order: 2
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

The first and most common is the [monthly](https://eksrvb.github.io/material-calendar/configuration/monthly) Mode. The second is an [annual](https://eksrvb.github.io/material-calendar/configuration/annual) mode that shows every 12 months of the year.

In addition to this modes, there is also a basic configuration, as shown below.

## API reference for material-calendar

import the `MaterialCalendarModule` and optional provide your location.<br>
In my case: `{provide:  LOCALE_ID, useValue:  'de-DE' }`

File: app.module.ts

```typescript
import { MaterialCalendarModule } from  'material-calendar'; // <-- add this line
```

Optionally provide your location:
```typescript
  [...]
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE' } // <-- add this line (depending on your location)
  ],
  [...]
```

## selectors

### calendar-panel

| Name | Default | Description |
| ---- | ------- | ----------- |
| placeholderDay: boolean | false | show a day that does not occur directly in the month and serves as a visual placeholder |
| dataSource: DayC[]      | null | transfer own days to equip the existing days in the component with data |
| year: number            | current year | select the start year |
| month: number           | current month | select the start month |
| monthsBefore: number    | 0 | how many months should be displayed before the selected month |
| monthsAfter: number     | 0 | how many months should be displayed after the selected month |
| config: CalendarConfig  | null | overwrite configuration for the component |
| (clickDate)             | - | returns an event with selected days depending on the selected mode (single click or range of days) |

## interfaces

### CalendarConfig

| Name | Default | Description |
| ---- | ------- | ----------- |
| {string}    renderMode           | monthly | choose render mode ('annual' or 'monthly') |
| {string}    selectMode           | click | choose select mode ('click' or 'range') |
| {boolean}   calendarWeek         | false | display the calendar week |
| {boolean}   displayYear          | true | displays the year next to the Month name |
| {boolean}   switches             | true | show arrows to navigate an month forward or backwards |
| {boolean}   bluredDays           | false | make an circle around the number of the day |
| {boolean}   markWeekend          | true | highlight weekends |
| {boolean}   firstDayOfWeekMonday | true | set first day of week (monday or sunday) |
| {string}    panelWidth           | 350px | set a with for an single panel |

### DayC

| Name | Default | Description |
| ---- | ------- | ----------- |
| {Date}     date            | null | Date to match |
| {string}   color           | null | set a custom color (hex, string, or var) |
| {string}   backgroundColor | null | set a custom Background Color (hex, string, or var) |
| {string}   badgeMode       | null | badgeMode options: 'Int' or 'Icon' |
| {number}   badgeInt        | null | if badgeMode == 'Int', set our Number here |
| {string}   badgeIcon       | null | if badgeMode == 'Icon', set Icon (Matireal-Icons) |
| {string}   toolTip         | null | if set, this displays a mat-tooltip |

## theaming

Make sure your using the standard material palette!

> Since Version 3.1.0 theaming is required.

style.scss or theme.scss
```scss
@import "material-calendar/calendar-theme.scss";
// standard angular material -->
@import "~@angular/material/theming";
@include mat-core();

$mat-primary-palette: mat-palette($mat-indigo);
$mat-accent-palette: mat-palette($mat-light-green);

$app-light-theme: mat-light-theme($mat-primary-palette, $mat-accent-palette);
$app-dark-theme: mat-dark-theme($mat-primary-palette, $mat-accent-palette);

@include angular-material-theme($app-light-theme);
// <-- standard angular material
// this include prowides the calendar with the right colors
@include calendar-theme($app-light-theme);

// following section is for dark mode and optional.
// use appropriate class name for darkMode
.darkMode {
  @include angular-material-theme($app-dark-theme);
  @include calendar-theme($app-dark-theme);
}
```
