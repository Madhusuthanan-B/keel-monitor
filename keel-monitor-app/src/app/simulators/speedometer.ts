
import { SpeedometerConfiguration } from '../factory/instruments-factory';
import { Range } from '../models/range';
import { Instrument } from './instrument';

export class Speedometer extends Instrument {
    value: number;

    constructor(private config: SpeedometerConfiguration) {
        super();
        this.value = 0;
    }

    startSimulation(): void {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateValue(this.config.value);
    }

    private simulateValue(range: Range) {
        this.value = range.start;
        this.addSubscription('value', this.rangeTicker(range, this.value).subscribe(val => this.value = val));
    }

}
