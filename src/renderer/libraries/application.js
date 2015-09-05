import _ from 'lodash'
import application from '../singletons/application'
import ChannelSelector from '../command-models/channel-selector'
import DefaultWebBrowser from '../command-models/default-web-browser'
import ipc from 'ipc'
import React from 'react'
import Root from '../components/root'
import TwitterAccount from '../command-models/twitter-account'

export default class Application {
  get channelSelector() {
    return _.memoize(() => {
      return new ChannelSelector({
        twitterAccount: this.twitterAccount
      });
    })();
  }

  get defaultWebBrowser() {
    return _.memoize(() => {
      return new DefaultWebBrowser();
    })();
  }

  get propertiesForView() {
    return {
      channelSelector: this.channelSelector,
      defaultWebBrowser: this.defaultWebBrowser,
      onAnchorClicked: this.onAnchorClicked.bind(this),
      onChannelClicked: this.onChannelClicked.bind(this),
      onTweetSubmitted: this.onTweetSubmitted.bind(this),
      twitterAccount: this.twitterAccount
    }
  }

  get twitterAccount() {
    return _.memoize(() => {
      return new TwitterAccount({
        accessToken: application.accessToken,
        accessTokenSecret: application.accessTokenSecret,
        consumerKey: application.consumerKey,
        consumerSecret: application.consumerSecret
      });
    })();
  }

  fetchAndSubscribeUserData() {
    this.twitterAccount.fetchAndSubscribeUserData();
  }

  onAnchorClicked(url) {
    this.defaultWebBrowser.openUrl(url);
  }

  onChannelClicked(channelId) {
    this.channelSelector.selectChannel(channelId);
  }

  onTweetSubmitted(text) {
    this.twitterAccount.postTweet(text);
  }

  renderView() {
    React.render(
      <Root {...this.propertiesForView} />,
      document.body
    );
  }

  run() {
    this.renderView();
    this.fetchAndSubscribeUserData();
    this.subscribeGlobalShortcutEvents();
  }

  subscribeGlobalShortcutEvents() {
    ipc.on('select-next-channel-requested', () => {
      this.channelSelector.selectNextChannel();
    });
    ipc.on('select-previous-channel-requested', () => {
      this.channelSelector.selectPreviousChannel();
    });
  }
}
