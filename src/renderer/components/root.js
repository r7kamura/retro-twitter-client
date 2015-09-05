import AccountSwitcher from './account-switcher'
import application from '../singletons/application'
import ChannelSelector from '../command-models/channel-selector'
import ContextSwitcher from './channel-switcher'
import DefaultWebBrowser from '../command-models/default-web-browser'
import ipc from 'ipc'
import Main from './main'
import React from 'react';
import store from '../singletons/store'
import TwitterAccount from '../command-models/twitter-account'

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.defaultWebBrowser = new DefaultWebBrowser();
    this.twitterAccount = new TwitterAccount({
      accessToken: application.accessToken,
      accessTokenSecret: application.accessTokenSecret,
      consumerKey: application.consumerKey,
      consumerSecret: application.consumerSecret
    });
    this.channelSelector = new ChannelSelector({ twitterAccount: this.twitterAccount });
  }

  componentDidMount() {
    this.subscribeStore();
    this.subscribeGlobalShortcutEvents();
    this.twitterAccount.fetchAndSubscribeUserData();
  }

  onAnchorClicked(url) {
    this.defaultWebBrowser.openUrl(url);
  }

  onChannelClicked(channelId) {
    this.channelSelector.selectChannel(channelId);
  }

  postTweet(text) {
    this.twitterAccount.postTweet(text);
  }

  subscribeGlobalShortcutEvents() {
    ipc.on('select-next-channel-requested', () => {
      this.channelSelector.selectNextChannel();
    });
    ipc.on('select-previous-channel-requested', () => {
      this.channelSelector.selectPreviousChannel();
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
        <AccountSwitcher account={this.state.user} />
        <ContextSwitcher account={this.state.user} channelId={this.state.channelId} lists={this.state.lists} onChannelClicked={this.onChannelClicked.bind(this)} />
        <Main channelId={this.state.channelId} onAnchorClicked={this.onAnchorClicked.bind(this)} postTweet={this.postTweet.bind(this)} homeTimelineTweets={this.state.homeTimelineTweets} listTweets={this.state.listTweets} searchedTweets={this.state.searchedTweets} />
      </div>
    );
  }
}
