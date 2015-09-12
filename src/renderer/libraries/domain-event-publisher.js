export default class DomainEventPublisher {
  constructor() {
    this.subscriptions = [];
    this.typedSubscriptions = [];
  }

  /**
   * @param {String} type
   * @param {Function} subscription
   */
  on(type, subscription) {
    this.typedSubscriptions.push({ subscription, type });
    return this;
  }

  /**
   * @param {Object} domainEvent
   */
  publish(domainEvent) {
    this.subscriptions.forEach((subscription) => {
      subscription(domainEvent);
    });
    this.typedSubscriptions.forEach(({ type, subscription }) => {
      if (domainEvent.type === type) {
        subscription(domainEvent);
      }
    });
  }

  /**
   * @param {Function} subscription
   */
  subscribe(subscription) {
    this.subscriptions.push(subscription);
    return this;
  }
}
