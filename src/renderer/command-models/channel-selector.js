import store from '../singletons/store'

export default class ChannelSelector {
  constructor({ twitterAccount }) {
    this.twitterAccount = twitterAccount;
  }

  selectChannel(channelId) {
    if (channelId !== 'HOME_TIMELINE_CHANNEL' && channelId !== 'SEARCH_CHANNEL') {
      if (store.getState().listId !== channelId) {
        store.dispatch({
          type: 'LIST_TWEETS_CLEARED'
        });
      }
      this.twitterAccount.fetchListTweets({ listId: channelId });
    }
    store.dispatch({
      channelId,
      type: 'CHANNEL_SELECTED'
    });
  }

  selectNextChannel() {
    const state = store.getState();
    switch (state.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      this.selectSearchChannel();
      break;
    case 'SEARCH_CHANNEL':
      if (state.lists.length > 0) {
        this.selectChannel(state.lists[0].id_str);
        break;
      } else {
        this.selectChannel('HOME_TIMELINE_CHANNEL');
        break;
      }
    default:
      const channelId = state.channelId;
      const lists = state.lists;
      let index = -1;
      for (var i = 0; i < lists.length; i++) {
        index++;
        if (lists[i].id_str === channelId) {
          break;
        }
      }
      if (-1 < index && index < state.lists.length - 1) {
        this.selectChannel(lists[index + 1].id_str);
      } else {
        this.selectChannel('HOME_TIMELINE_CHANNEL');
      }
    }
  }

  selectPreviousChannel() {
    const state = store.getState();
    switch (state.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      if (state.lists.length > 0) {
        this.selectChannel(state.lists[state.lists.length - 1].id_str);
        break;
      }
    case 'SEARCH_CHANNEL':
      this.selectChannel('HOME_TIMELINE_CHANNEL');
      break;
    default:
      const channelId = state.channelId;
      const lists = state.lists;
      let index = -1;
      for (var i = 0; i < lists.length; i++) {
        index++;
        if (lists[i].id_str === channelId) {
          break;
        }
      }
      if (index - 1 >= 0) {
        this.selectChannel(lists[index - 1].id_str);
      } else {
        this.selectSearchChannel();
      }
    }
  }

  selectSearchChannel() {
    this.selectChannel('SEARCH_CHANNEL');
  }
}
