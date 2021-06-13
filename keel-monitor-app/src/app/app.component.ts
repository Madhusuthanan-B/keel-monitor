import { Component, OnInit } from '@angular/core';
import { Theme } from './models/theme';
import { AzimuthThruster } from './simulators/azimuth-thruster';
import { Speedometer } from './simulators/speedometer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'keel-monitor-app';
  azimuthThruser: AzimuthThruster;
  speedoMeter: Speedometer;

  ngOnInit() {
    this.azimuthThruser = new AzimuthThruster();
    this.speedoMeter = new Speedometer();
  }

  startSimulation() {
    this.azimuthThruser.startSimulation();
    this.speedoMeter.startSimulation();
  }

  stopSimulation() {
    this.azimuthThruser.stopSimulation();
    this.speedoMeter.stopSimulation();
  }


  applyTheme(theme: Theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}
