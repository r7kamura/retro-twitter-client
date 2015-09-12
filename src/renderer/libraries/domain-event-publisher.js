import { EventEmitter2 } from 'eventemitter2'

export default class DomainEventPublisher extends EventEmitter2 {
  constructor() {
    super({ wildcard: true });
  }

  publish(domainEvent) {
    this.emit(domainEvent.type, domainEvent);
  }
}
