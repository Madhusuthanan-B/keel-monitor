import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Theme } from './models/theme';
import { AzimuthThruster } from './simulators/azimuth-thruster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'keel-monitor-app';
  azimuthThruser: AzimuthThruster;

  ngOnInit() {
    this.azimuthThruser = new AzimuthThruster();
    this.azimuthThruser.simulate();
  }


  applyTheme(theme: Theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}
