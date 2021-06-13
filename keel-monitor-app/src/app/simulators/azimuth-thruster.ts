import { Range } from '../models/range';
import { Simulator } from './base-simulator';

export class AzimuthThruster extends Simulator {
    targetAngle: number;
    angle: number;
    value: number;
    target: number;
    showPortStarboard: boolean;
    showSetPointValue: boolean;
    showSetPointAngle: boolean;

    constructor() {
        super();
        this.target = 0;
        this.value = 0;
        this.angle = 0;
        this.targetAngle = 0;
        this.showPortStarboard = false;
        this.showSetPointValue = false;
        this.showSetPointAngle = false;
    }

    startSimulation() {
        this.simulateAngle({ start: 0, end: 360, frequency: 25, delta: 0.1 });
        this.simulateValue({ start: 22, end: 80, frequency: 50, delta: 1 });
    }

    stopSimulation() {
        Object.keys(this.timers).forEach((timer) => {
            clearInterval(this.timers[timer]);
        });
    }

    private simulateAngle(range: Range) {

        let forward = true;
        const timer = setInterval(() => {

            if (forward) {
                this.angle = this.angle + range.delta;
                forward = !(this.angle > range.end);
            }
            else {
                this.angle = this.angle - range.delta;
                forward = this.angle === range.start;
            }
        }, range.frequency);
        this.timers['angle'] = timer;
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
}