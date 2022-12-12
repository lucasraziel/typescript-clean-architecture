import EventInterface from './event.interface';

export default class FakeEvent implements EventInterface {
    dataTimeOccurred: Date;

    eventData: unknown;

    constructor() {
        this.dataTimeOccurred = new Date();
        this.eventData = {};
    }
}
