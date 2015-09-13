import domainEventPublisher from '../singletons/domain-event-publisher'
import applicationState from '../singletons/application-state'

export default class ChannelSelector {
  selectChannel(channelId) {
    if (channelId !== 'HOME_TIMELINE_CHANNEL' && channelId !== 'SEARCH_CHANNEL') {
      if (applicationState.listId !== channelId) {
        domainEventPublisher.publish({
          type: 'LIST_TWEETS_CLEARED'
        });
      }
      domainEventPublisher.publish({
        listId: channelId,
        type: 'LIST_CHANNEL_SELECTED'
      });
    }
    domainEventPublisher.publish({
      channelId,
      type: 'CHANNEL_SELECTED'
    });
  }

  selectNextChannel() {
    this.selectChannel(applicationState.nextChannelId);
  }

  selectPreviousChannel() {
    this.selectChannel(applicationState.previousChannelId);
  }

  selectSearchChannel() {
    this.selectChannel('SEARCH_CHANNEL');
  }
}
