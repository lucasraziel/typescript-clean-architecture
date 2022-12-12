import EventInterface from '../../@shared/event/event.interface';
import Customer from '../entity/customer';

export default class CustomerChangedAddress implements EventInterface {
    dataTimeOccurred: Date;

    eventData: { customer: Customer };

    constructor(eventData: { customer: Customer }) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
