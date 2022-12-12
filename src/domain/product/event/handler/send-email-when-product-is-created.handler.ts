import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import ProductCreatedEvent from '../product-created.event';

import logger from '../../../../infrastructure/@shared/log/logger';

export default class SendEmailWhenProductIsCreatedHandler
    implements EventHandlerInterface<ProductCreatedEvent>
{
    handle(event: ProductCreatedEvent): void {
        logger.info(`Sending email to .....${event.eventData}`);
    }
}
