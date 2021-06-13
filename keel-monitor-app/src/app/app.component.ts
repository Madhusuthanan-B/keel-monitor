import { Component, OnInit } from '@angular/core';
import { AzimuthThrusterConfiguration, AzimuthThrusterFactory, BarMeterConfiguration, CogConfiguration, CogFactory, InstrumentFactory, RudderConfiguration, RudderFactory, SpeedometerConfiguration, SpeedometerFactory } from './factory/instruments-factory';
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

  constructor(private configService: ConfigFetcherService) { }

  ngOnInit() {

    this.configService.fetchInstrumentsConfig().subscribe((config) => {
      this.azimuthThruser = new AzimuthThruster(InstrumentFactory.getInstrument('azimuth-thruster', config) as AzimuthThrusterConfiguration);
      this.speedoMeter = new Speedometer(InstrumentFactory.getInstrument('speedometer', config) as SpeedometerConfiguration);
      this.rudder = new Rudder(InstrumentFactory.getInstrument('rudder', config) as RudderConfiguration);
      this.cog = new CourseOverGround(InstrumentFactory.getInstrument('cog', config) as CogConfiguration);
      this.barMeter = new BarMeter(InstrumentFactory.getInstrument('barmeter', config) as BarMeterConfiguration);
      this.startSimulation();
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


  applyTheme(theme: Theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}
