import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';
import logger from '../../../infrastructure/@shared/log/logger';
import FakeEvent from './FakeEvent';

export default class FakeEventHandler
    implements EventHandlerInterface<FakeEvent>
{
    handle(event: EventInterface): void {
        logger.info(event);
    }
}
