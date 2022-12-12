import EventDispatcher from '../../../@shared/event/event-dispatcher';
import CustomerCreatedEvent from '../customer-created.event';
import CustomerChangedAddressEvent from '../customer-changed-address.event';
import SendConsoleWhenCustomerIsCreated1Handler from './send-console-when-customer-is-created1.handler';
import SendConsoleWhenCustomerIsCreated2Handler from './send-console-when-customer-is-created2.handler';
import SendConsoleWhenCustomerHasAddressChanged from './send-console-when-customer-has-address-changed.handler';
import Customer from '../../entity/customer';
import Address from '../../value-object/address';

describe('Events for customer', () => {
    it('should call all events for customer created', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenCustomerIsCreated1Handler();
        const eventHandler2 = new SendConsoleWhenCustomerIsCreated2Handler();

        const spyEventHandler = jest.spyOn(eventHandler, 'handle');
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

        eventDispatcher.register('CustomerCreatedEvent', eventHandler);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

        // Act
        eventDispatcher.notify(new CustomerCreatedEvent({}));

        // Assert
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it('should call all events for customer who had address changed', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenCustomerHasAddressChanged();

        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('CustomerChangedAddress', eventHandler);

        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
        customer.changeAddress(address);
        // Act
        eventDispatcher.notify(new CustomerChangedAddressEvent({ customer }));

        // Assert
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
