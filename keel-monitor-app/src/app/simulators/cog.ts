import { Simulator } from './base-simulator';
import { Range } from '../models/range';

export class CourseOverGround extends Simulator {
    heading: number;
    courseOverGround: number;
    northUp: boolean;

    constructor() {
        super();
        this.heading = 0;
        this.courseOverGround = 0;
    }

    startSimulation(): void {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateHeading({ start: 260, end: 290, frequency: 40, delta: 0.1 });
        this.simulateCog({ start: 285, end: 295, frequency: 50, delta: 0.1 });
    }

    private simulateHeading(range: Range) {
        this.heading = range.start;
        this.addSubscription('heading', this.rangeTicker(range, this.heading).subscribe(val => this.heading = val));
    }

    private simulateCog(range: Range) {
        this.courseOverGround = range.start;
        this.addSubscription('cog', this.rangeTicker(range, this.courseOverGround).subscribe(val => this.courseOverGround = val));
    }

}
