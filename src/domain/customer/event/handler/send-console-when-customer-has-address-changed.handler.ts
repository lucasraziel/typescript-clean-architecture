import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CustomerChangedAddress from '../customer-changed-address.event';

import logger from '../../../../infrastructure/@shared/log/logger';

export default class SendConsoleWhenCustomerIsCreated1Handler
    implements EventHandlerInterface<CustomerChangedAddress>
{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(event: CustomerChangedAddress): void {
        const { customer } = event.eventData;
        logger.info(
            `Endereço do cliente: ${customer.id}, ${
                customer.name
            } alterado para: ${customer.Address.toString()}`
        );
    }
}
