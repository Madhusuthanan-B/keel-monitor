export abstract class Simulator {
    abstract startSimulation(): void;
    abstract stopSimulation(): void;
    timers: { [key: string]: ReturnType<typeof setInterval> } = {};
}