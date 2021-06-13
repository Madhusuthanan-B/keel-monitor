import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keel-monitor-app';
  open = false;

  toggle(event) {
    this.open = event.detail;
  }
}
