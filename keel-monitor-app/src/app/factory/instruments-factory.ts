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

export class Payload {
    azimuth: AzimuthThrusterConfiguration;
    speedometer: SpeedometerConfiguration;
    cog: CogConfiguration;
    rudder: RudderConfiguration;
}

export abstract class InstrumentFactory {

    abstract getInstrumentConfiguration(payload: Payload);

    static getInstrument(type: TypeOfInstument, payload: Payload): InstrumentConfiguration {
        switch (type) {
            case 'azimuth-thruster':
                return new AzimuthThrusterFactory().getInstrumentConfiguration(payload)
            case 'speedometer':
                return new SpeedometerFactory().getInstrumentConfiguration(payload);
            case 'cog':
                return new CogFactory().getInstrumentConfiguration(payload);
            case 'rudder':
                return new RudderFactory().getInstrumentConfiguration(payload);
        }
    }
}

export class AzimuthThrusterFactory extends InstrumentFactory {

    getInstrumentConfiguration(payload: Payload): AzimuthThrusterConfiguration {
        return payload.azimuth;
    }
}

export class CogFactory extends InstrumentFactory {
    getInstrumentConfiguration(payload: Payload): CogConfiguration {
        return payload.cog;
    }
}

export class SpeedometerFactory extends InstrumentFactory {
    getInstrumentConfiguration(payload: Payload): SpeedometerConfiguration {
        return payload.speedometer;
    }
}

export class RudderFactory extends InstrumentFactory {
    getInstrumentConfiguration(payload: Payload): RudderConfiguration {
        return payload.rudder;
    }
}
