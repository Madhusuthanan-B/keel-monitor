import { CogConfiguration } from '../factory/instruments-factory';
import { Range } from '../models/range';
import { Instrument } from './instrument';

export class CourseOverGround extends Instrument {
    heading: number;
    courseOverGround: number;
    northUp: boolean;

    constructor(private config: CogConfiguration) {
        super();
        this.heading = 0;
        this.courseOverGround = 0;
    }

    startSimulation(): void {
        if (this.isSimulationActive) {
            this.stopSimulation();
        }
        this.isSimulationActive = true;
        this.simulateHeading(this.config.heading);
        this.simulateCog(this.config.courseOverGround);
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
