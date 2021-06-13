import { AzimuthThrusterConfiguration } from '../factory/instruments-factory';
import { Range } from '../models/range';
import { Instrument } from './instrument';

export class AzimuthThruster extends Instrument {
    targetAngle: number;
    angle: number;
    value: number;
    target: number;
    showPortStarboard: boolean;
    showSetPointValue: boolean;
    showSetPointAngle: boolean;

    constructor(private config: AzimuthThrusterConfiguration) {
        super();
        this.target = 0;
        this.value = 0;
        this.angle = 0;
        this.targetAngle = 0;
        this.showPortStarboard = false;
        this.showSetPointValue = true;
        this.showSetPointAngle = true;
    }

    startSimulation() {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateAngle(this.config.angle);
        this.simulateValue(this.config.value);
        this.simulateTargetAngle(this.config.targetAngle);
    }

    private simulateAngle(range: Range) {
        this.angle = range.start;
        this.addSubscription('angle', this.rangeTicker(range, this.angle).subscribe(val => this.angle = val));
    }

    private simulateValue(range: Range) {
        this.value = range.start;
        this.addSubscription('value', this.rangeTicker(range, this.value).subscribe(val => this.value = val));
    }

    private simulateTargetAngle(range: Range) {
        this.targetAngle = range.start;
        this.addSubscription('targetAngle', this.rangeTicker(range, this.targetAngle).subscribe(val => this.targetAngle = val));
    }
}