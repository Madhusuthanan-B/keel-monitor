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
        this.showSetPointValue = true;
        this.showSetPointAngle = true;
    }

    startSimulation() {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateAngle({ start: 0, end: 360, frequency: 25, delta: 0.1 });
        this.simulateValue({ start: 20, end: 50, frequency: 50, delta: 1 });
        this.simulateTargetAngle({ start: 0, end: 360, frequency: 3000, delta: 25 });
    }

    stopSimulation() {
        this.clearTimers();
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

    private simulateTarget(range: Range) {

        let forward = true;
        const timer = setInterval(() => {

            if (forward) {
                this.target = this.target + range.delta;
                forward = !(this.target > range.end);
            }
            else {
                this.target = this.target - range.delta;
                forward = this.target === range.start;
            }
        }, range.frequency);
        this.timers['target'] = timer;
    }

    private simulateTargetAngle(range: Range) {

        let forward = true;
        const timer = setInterval(() => {

            if (forward) {
                this.targetAngle = this.targetAngle + range.delta;
                forward = !(this.targetAngle > range.end);
            }
            else {
                this.targetAngle = this.targetAngle - range.delta;
                forward = this.targetAngle === range.start;
            }
        }, range.frequency);
        this.timers['targetAngle'] = timer;
    }
}