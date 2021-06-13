import { Component, OnInit } from '@angular/core';
import { Theme } from './models/theme';
import { AzimuthThruster } from './simulators/azimuth-thruster';
import { Rudder } from './simulators/rudder';
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
  rudder: Rudder;

  ngOnInit() {
    this.azimuthThruser = new AzimuthThruster();
    this.speedoMeter = new Speedometer();
    this.rudder = new Rudder();

    this.startSimulation();
  }

  startSimulation() {
    this.azimuthThruser.startSimulation();
    this.speedoMeter.startSimulation();
    this.rudder.startSimulation();
  }

  stopSimulation() {
    this.azimuthThruser.stopSimulation();
    this.speedoMeter.stopSimulation();
    this.rudder.stopSimulation();
  }


  applyTheme(theme: Theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}
