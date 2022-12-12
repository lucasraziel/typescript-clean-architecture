import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CustomerCreatedEvent from '../customer-created.event';

import logger from '../../../../infrastructure/@shared/log/logger';

export default class SendConsoleWhenCustomerIsCreated2Handler
    implements EventHandlerInterface<CustomerCreatedEvent>
{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(event: CustomerCreatedEvent): void {
        logger.info(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}
