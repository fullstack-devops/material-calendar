import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';

  placeholder = false
  calendarConfig = {
    bgColor: 'rgb(0, 203, 127)'
  }
}