import EventDispatcher from '../../../@shared/event/event-dispatcher';
import ProductCreatedEvent from '../product-created.event';
import SendEmailWhenProductIsCreatedHandler from './send-email-when-product-is-created.handler';

describe('Send Email when prodcuct is created handler', () => {
    it('should send email', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        // Act
        eventDispatcher.notify(new ProductCreatedEvent({ data: 'test' }));

        // Assert
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
