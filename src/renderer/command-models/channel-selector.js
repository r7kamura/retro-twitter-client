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
    switch (applicationState.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      this.selectSearchChannel();
      break;
    case 'SEARCH_CHANNEL':
      if (applicationState.listIds.length > 0) {
        this.selectChannel(applicationState.listIds[0]);
        break;
      } else {
        this.selectChannel('HOME_TIMELINE_CHANNEL');
        break;
      }
    default:
      let index = -1;
      for (var i = 0; i < applicationState.listIds.length; i++) {
        index++;
        if (applicationState.listIds[i] === applicationState.channelId) {
          break;
        }
      }
      if (-1 < index && index < applicationState.listIds.length - 1) {
        this.selectChannel(applicationState.listIds[index + 1]);
      } else {
        this.selectChannel('HOME_TIMELINE_CHANNEL');
      }
    }
  }

  selectPreviousChannel() {
    switch (applicationState.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      if (applicationState.listIds.length > 0) {
        this.selectChannel(applicationState.listIds[applicationState.listIds.length - 1]);
        break;
      }
    case 'SEARCH_CHANNEL':
      this.selectChannel('HOME_TIMELINE_CHANNEL');
      break;
    default:
      let index = -1;
      for (var i = 0; i < applicationState.listIds.length; i++) {
        index++;
        if (applicationState.listIds[i] === applicationState.channelId) {
          break;
        }
      }
      if (index - 1 >= 0) {
        this.selectChannel(applicationState.listIds[index - 1]);
      } else {
        this.selectSearchChannel();
      }
    }
  }

  selectSearchChannel() {
    this.selectChannel('SEARCH_CHANNEL');
  }
}
