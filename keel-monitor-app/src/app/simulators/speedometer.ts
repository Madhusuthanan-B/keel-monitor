import { Simulator } from './base-simulator';
import { Range } from '../models/range';

export class Speedometer extends Simulator {
    value: number;

    constructor() {
        super();
        this.value = 0;
    }

    startSimulation(): void {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.simulateValue({ start: 5, end: 15, frequency: 80, delta: 0.1 });
    }

    private simulateValue(range: Range) {

        let forward = true;
        const timer = setInterval(() => {

            if (forward) {
                this.value = this.value + range.delta;
                forward = !(this.value > range.end);
            }
            else {
                this.value = this.value - range.delta;
                forward = this.value === range.start;
            }
        }, range.frequency);
        this.timers['value'] = timer;
    }


    stopSimulation(): void {
        this.clearTimers();
    }

}
