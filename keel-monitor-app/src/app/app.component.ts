import { Component, ViewEncapsulation } from '@angular/core';
import { Theme } from './models/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'keel-monitor-app';


  applyTheme(theme: Theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}
