
import { Range } from '../models/range';
import { Instrument } from './instrument';

export class Speedometer extends Instrument {
    value: number;

    constructor() {
        super();
        this.value = 0;
    }

    startSimulation(): void {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateValue({ start: 5, end: 15, frequency: 80, delta: 0.1 });
    }

    private simulateValue(range: Range) {
        this.value = range.start;
        this.addSubscription('value', this.rangeTicker(range, this.value).subscribe(val => this.value = val));
    }

}
