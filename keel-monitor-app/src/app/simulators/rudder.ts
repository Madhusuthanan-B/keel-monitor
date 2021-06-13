import { Simulator } from './base-simulator';
import { Range } from '../models/range';

export class Rudder extends Simulator {
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

    stopSimulation(): void {
        this.clearTimers();
    }

    private simulateSetPoint(range: Range) {

        let forward = true;
        const timer = setInterval(() => {

            if (forward) {
                this.rudderSetPointAngle = this.rudderSetPointAngle + range.delta;
                forward = !(this.rudderSetPointAngle > range.end);
            }
            else {
                this.rudderSetPointAngle = this.rudderSetPointAngle - range.delta;
                forward = this.rudderSetPointAngle === range.start;
            }
        }, range.frequency);
        this.timers['rudderSetPoint'] = timer;
    }

    private simulateAngle(range: Range) {

        let forward = true;
        const timer = setInterval(() => {

            if (forward) {
                this.rudderAngle = this.rudderAngle + range.delta;
                forward = !(this.rudderAngle > range.end);
            }
            else {
                this.rudderAngle = this.rudderAngle - range.delta;
                forward = this.rudderAngle === range.start;
            }
        }, range.frequency);
        this.timers['rudderAngle'] = timer;
    }
}
