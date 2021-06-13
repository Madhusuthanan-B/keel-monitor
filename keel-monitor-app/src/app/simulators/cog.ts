import { Simulator } from './base-simulator';
import { Range } from '../models/range';
import { Observable } from 'rxjs';

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
        this.simulateHeading({ start: 250, end: 290, frequency: 50, delta: 1 });
    }

    stopSimulation(): void {
        this.clearTimers();
    }

    private simulateHeading(range: Range) {
        this.heading = range.start;
        this.foo(range, this.heading).subscribe((val) => {
            console.log('heading', val);
            this.heading = val;
        })
        // this.forwardHeading(range);
    }

    private forwardHeading(range: Range) {
        const forwardClock = setInterval(() => {
            if (this.heading <= range.end) {
                this.heading += range.delta;
            } else {
                clearInterval(forwardClock);
                this.backwardHeading(range);
            }
        }, range.frequency);
        this.timers['heading-forward'] = forwardClock;
    }

    private backwardHeading(range: Range) {
        const backwardClock = setInterval(() => {
            if (this.heading >= range.start) {
                this.heading -= range.delta;
            } else {
                clearInterval(backwardClock);
                this.forwardHeading(range);
            }
        }, range.frequency);
        this.timers['heading-back'] = backwardClock;
    }

    private foo(range: Range, currentValue: number): Observable<number> {
        return new Observable((observer) => {

            function forwardClock() {
                const forward = setInterval(() => {
                    if (currentValue <= range.end) {
                        currentValue += range.delta;
                        observer.next(currentValue);
                    } else {
                        clearInterval(forward);
                        backwardClock()
                    }
                }, range.frequency);
            }

            function backwardClock() {
                const backward = setInterval(() => {
                    if (currentValue >= range.start) {
                        currentValue -= range.delta;
                        observer.next(currentValue);
                    } else {
                        clearInterval(backward);
                        forwardClock();
                    }
                }, range.frequency);
            }

            forwardClock();
        });
    }

}
