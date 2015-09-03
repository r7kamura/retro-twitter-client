import AccountSwitcher from './account-switcher'
import ContextSwitcher from './channel-switcher'
import ipc from 'ipc'
import Main from './main'
import React from 'react';
import store from '../libraries/store'
import {
  fetchAccount,
  fetchTweets,
  fetchLists,
  openUrl,
  postTweet,
  searchTweets,
  selectChannel,
  selectNextChannel,
  selectPreviousChannel,
  subscribeStream
} from '../libraries/action-creators'

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.subscribeStore();
    this.subscribeGlobalShortcutEvents();
    this.run();
  }

  onAnchorClicked(url) {
    store.dispatch(openUrl(url));
  }

  onChannelClicked(channelId) {
    store.dispatch(selectChannel(channelId));
  }

  postTweet(text) {
    store.dispatch(postTweet(text));
  }

  run() {
    store.dispatch(fetchAccount());
  }

  subscribeGlobalShortcutEvents() {
    ipc.on('select-next-channel-requested', () => {
      store.dispatch(selectNextChannel());
    });
    ipc.on('select-previous-channel-requested', () => {
      store.dispatch(selectPreviousChannel());
    });
  }

  subscribeStore() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher account={this.state.account} />
        <ContextSwitcher account={this.state.account} channelId={this.state.channelId} lists={this.state.lists} onChannelClicked={this.onChannelClicked.bind(this)} />
        <Main channelId={this.state.channelId} onAnchorClicked={this.onAnchorClicked.bind(this)} postTweet={this.postTweet.bind(this)} homeTimelineTweets={this.state.homeTimelineTweets} listTweets={this.state.listTweets} searchedTweets={this.state.searchedTweets} />
      </div>
    );
  }
}
