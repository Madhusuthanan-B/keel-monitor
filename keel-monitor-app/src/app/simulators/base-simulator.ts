import { Observable, Subscription } from 'rxjs';
import { Range } from '../models/range';

export abstract class Simulator {
    abstract startSimulation(): void;
    abstract stopSimulation(): void;
    private subscriptions: Map<string, Subscription> = new Map();

    public rangeTicker(range: Range, currentValue: number): Observable<number> {
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

    public addSubscription(key: string, value: Subscription) {
        this.subscriptions.set(key, value);
    }

    public clearAllSubscriptions() {
        this.subscriptions.forEach((value: Subscription, key: string) => {
            this.removeSubscription(key);
        });
        this.subscriptions.clear();
    }

    public removeSubscription(key: string) {
        const sub = this.subscriptions.get(key);
        sub.unsubscribe();
    }

    public clearTimers() {
        Object.keys(this.timers).forEach((timer) => {
            clearInterval(this.timers[timer]);
        });
    }
    timers: { [key: string]: ReturnType<typeof setInterval> } = {};
    isSimulationActive: boolean;
}