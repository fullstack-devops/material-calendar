import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularCalendarModule } from 'projects/angular-calendar/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularCalendarModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
