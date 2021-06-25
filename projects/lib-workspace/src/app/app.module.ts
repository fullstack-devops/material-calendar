import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialCalendarModule } from 'projects/material-calendar/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MaterialCalendarModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
