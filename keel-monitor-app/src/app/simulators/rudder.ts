import { Range } from '../models/range';
import { Instrument } from './instrument';

export class Rudder extends Instrument {
    rudderSetPointAngle: number;
    rudderAngle: number;

    constructor() {
        super();
        this.rudderSetPointAngle = 0;
        this.rudderAngle = 0;
    }

    startSimulation(): void {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateSetPoint({ start: -50, end: 50, frequency: 1000, delta: 5 });
        this.simulateAngle({ start: -50, end: 50, frequency: 1200, delta: 5 });
    }

    private simulateSetPoint(range: Range) {
        this.rudderSetPointAngle = range.start;
        this.addSubscription('rudderSetPointAngle', this.rangeTicker(range, this.rudderSetPointAngle).subscribe(val => this.rudderSetPointAngle = val));
    }

    private simulateAngle(range: Range) {
        this.rudderAngle = range.start;
        this.addSubscription('rudderAngle', this.rangeTicker(range, this.rudderAngle).subscribe(val => this.rudderAngle = val));
    }
}
