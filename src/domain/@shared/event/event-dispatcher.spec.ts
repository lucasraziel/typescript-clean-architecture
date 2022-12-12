import FakeEventHandler from './FakeEventHandler';
import FakeEvent from './FakeEvent';
import EventDispatcher from './event-dispatcher';

describe('Domain events tests', () => {
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new FakeEventHandler();

        eventDispatcher.register('FakeEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers.FakeEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.FakeEvent.length).toBe(1);
        expect(eventDispatcher.getEventHandlers.FakeEvent[0]).toMatchObject(
            eventHandler
        );
    });

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new FakeEventHandler();

        eventDispatcher.register('FakeEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers.FakeEvent[0]).toMatchObject(
            eventHandler
        );

        eventDispatcher.unregister('FakeEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers.FakeEvent).toBeDefined();
        expect(eventDispatcher.getEventHandlers.FakeEvent.length).toBe(0);
    });

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new FakeEventHandler();

        eventDispatcher.register('FakeEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers.FakeEvent[0]).toMatchObject(
            eventHandler
        );

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers.FakeEvent).toBeUndefined();
    });

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new FakeEventHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('FakeEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers.FakeEvent[0]).toMatchObject(
            eventHandler
        );

        const fakeEvent = new FakeEvent();

        // Quando o notify for executado o FakeEventHandler.handle() deve ser chamado
        eventDispatcher.notify(fakeEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
