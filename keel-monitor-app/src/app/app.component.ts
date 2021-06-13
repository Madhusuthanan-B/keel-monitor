import { Component, OnInit } from '@angular/core';
import { Button } from './button-group/button';
import { AzimuthThrusterConfiguration, BarMeterConfiguration, CogConfiguration, InstrumentFactory, RudderConfiguration, SpeedometerConfiguration } from './factory/instruments-factory';
import { Theme } from './models/theme';
import { ConfigFetcherService } from './services/config-fetcher.service';
import { AzimuthThruster } from './simulators/azimuth-thruster';
import { CourseOverGround } from './simulators/cog';
import { BarMeter } from './simulators/meter';
import { Rudder } from './simulators/rudder';
import { Speedometer } from './simulators/speedometer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  azimuthThruser: AzimuthThruster;
  speedoMeter: Speedometer;
  rudder: Rudder;
  cog: CourseOverGround;
  barMeter: BarMeter;

  themeButtons: Button[] = [
    {
      name: 'Day',
      id: 'day',
      isActive: true
    },
    {
      name: 'Bright',
      id: 'bright',
      isActive: false
    },
    {
      name: 'Dusk',
      id: 'dusk',
      isActive: false
    },
    {
      name: 'Night',
      id: 'night',
      isActive: false
    }
  ];

  simulationButtons: Button[] = [
    {
      name: 'Start Simulation',
      id: 'start',
      isActive: false
    },
    {
      name: 'Stop Simulation',
      id: 'stop',
      isActive: false
    },
  ];

  constructor(private configService: ConfigFetcherService) { }

  ngOnInit() {

    this.configService.fetchInstrumentsConfig().subscribe((config) => {
      this.azimuthThruser = new AzimuthThruster(InstrumentFactory.getInstrument('azimuth-thruster', config) as AzimuthThrusterConfiguration);
      this.speedoMeter = new Speedometer(InstrumentFactory.getInstrument('speedometer', config) as SpeedometerConfiguration);
      this.rudder = new Rudder(InstrumentFactory.getInstrument('rudder', config) as RudderConfiguration);
      this.cog = new CourseOverGround(InstrumentFactory.getInstrument('cog', config) as CogConfiguration);
      this.barMeter = new BarMeter(InstrumentFactory.getInstrument('barmeter', config) as BarMeterConfiguration);
    });
  }

  startSimulation() {
    this.azimuthThruser.startSimulation();
    this.speedoMeter.startSimulation();
    this.rudder.startSimulation();
    this.cog.startSimulation();
    this.barMeter.startSimulation();
  }

  stopSimulation() {
    this.azimuthThruser.stopSimulation();
    this.speedoMeter.stopSimulation();
    this.rudder.stopSimulation();
    this.cog.stopSimulation();
    this.barMeter.stopSimulation();
  }

  handleSimulation(button: Button) {
    (button.id == 'start') ? this.startSimulation() : this.stopSimulation();
  }

  handleThemeSelection(button: Button) {
    this.applyTheme(button.id as Theme);
  }


  applyTheme(theme: Theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}
