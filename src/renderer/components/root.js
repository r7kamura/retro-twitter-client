import AccountSwitcher from './account-switcher'
import ContextSwitcher from './channel-switcher'
import ipc from 'ipc'
import Main from './main'
import React from 'react';
import reducer from '../libraries/reducer'
import storeCreator from '../libraries/store-creator'
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
    this.store = storeCreator(reducer);
    this.initializeState();
  }

  componentDidMount() {
    this.subscribeStore();
    this.subscribeGlobalShortcutEvents();
    this.startFetching();
  }

  initializeState() {
    this.state = this.store.getState();
  }

  onAnchorClicked(url) {
    this.store.dispatch(openUrl(url));
  }

  onChannelClicked(channelId) {
    this.store.dispatch(selectChannel(channelId));
  }

  postTweet(text) {
    this.store.dispatch(postTweet(text));
  }

  startFetching() {
    this.store.dispatch(fetchAccount());
  }

  subscribeGlobalShortcutEvents() {
    ipc.on('select-next-channel-requested', () => {
      this.store.dispatch(selectNextChannel());
    });
    ipc.on('select-previous-channel-requested', () => {
      this.store.dispatch(selectPreviousChannel());
    });
  }

  subscribeStore() {
    this.store.subscribe(() => {
      this.setState(this.store.getState());
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
