import { Range } from '../models/range';

export type TypeOfInstument = 'azimuth-thruster' | 'speedometer' | 'cog' | 'rudder';
export type InstrumentConfiguration = AzimuthThrusterConfiguration | RudderConfiguration | SpeedometerConfiguration | CogConfiguration;

export class AzimuthThrusterConfiguration {
    angle: Range;
    value: Range;
    targetAngle: Range;
}

export class SpeedometerConfiguration {
    value: Range;
}

export class CogConfiguration {
    heading: Range;
    courseOverGround: Range;
}

export class RudderConfiguration {
    rudderSetPointAngle: Range;
    rudderAngle: Range;
}

export abstract class InstrumentFactory {

    abstract getInstrumentConfiguration();

    static getInstrument(type: TypeOfInstument): InstrumentConfiguration {
        switch (type) {
            case 'azimuth-thruster':
                return new AzimuthThrusterFactory().getInstrumentConfiguration()
            case 'speedometer':
                return new SpeedometerFactory().getInstrumentConfiguration();
            case 'cog':
                return new CogFactory().getInstrumentConfiguration();
            case 'rudder':
                return new RudderFactory().getInstrumentConfiguration();
        }
    }
}

export class AzimuthThrusterFactory extends InstrumentFactory {

    getInstrumentConfiguration(): AzimuthThrusterConfiguration {
        return {
            angle: { start: 0, end: 360, frequency: 25, delta: 0.1 },
            value: { start: 20, end: 50, frequency: 50, delta: 1 },
            targetAngle: { start: 0, end: 360, frequency: 3000, delta: 25 }
        }
    }
}

export class CogFactory extends InstrumentFactory {
    getInstrumentConfiguration(): CogConfiguration {
        return {
            heading: { start: 260, end: 290, frequency: 40, delta: 0.1 },
            courseOverGround: { start: 285, end: 295, frequency: 50, delta: 0.1 }
        }
    }
}

export class SpeedometerFactory extends InstrumentFactory {
    getInstrumentConfiguration(): SpeedometerConfiguration {
        return {
            value: { start: 5, end: 15, frequency: 80, delta: 0.1 }
        }
    }
}

export class RudderFactory extends InstrumentFactory {
    getInstrumentConfiguration(): RudderConfiguration {
        return {
            rudderSetPointAngle: { start: -50, end: 50, frequency: 1000, delta: 5 },
            rudderAngle: { start: -50, end: 50, frequency: 1200, delta: 5 }
        }
    }
}
