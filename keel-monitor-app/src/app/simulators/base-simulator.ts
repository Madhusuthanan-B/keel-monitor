export abstract class Simulator {
    abstract startSimulation(): void;
    abstract stopSimulation(): void;
    public clearTimers() {
        Object.keys(this.timers).forEach((timer) => {
            clearInterval(this.timers[timer]);
        });
    }
    timers: { [key: string]: ReturnType<typeof setInterval> } = {};
    isSimulationActive: boolean;
}