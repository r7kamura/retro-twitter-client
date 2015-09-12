import _ from 'lodash'
import application from '../singletons/application'
import ChannelSelector from '../command-models/channel-selector'
import DefaultWebBrowser from '../command-models/default-web-browser'
import DesktopNotifier from '../command-models/desktop-notifier'
import domainEventPublisher from '../singletons/domain-event-publisher'
import ipc from 'ipc'
import KeyboardEventEmitter from '../libraries/keyboard-event-emitter'
import React from 'react'
import Root from '../components/root'
import store from '../singletons/store'
import TweetSelector from '../command-models/tweet-selector'
import TwitterAccount from '../command-models/twitter-account'

export default class Application {
  constructor() {
    this.defaultWebBrowser = new DefaultWebBrowser();
    this.desktopNotifier = new DesktopNotifier();
    this.keyboardEventEmitter = new KeyboardEventEmitter(document);
    this.tweetSelector = new TweetSelector();
    this.twitterAccount = new TwitterAccount({
      accessToken: application.accessToken,
      accessTokenSecret: application.accessTokenSecret,
      consumerKey: application.consumerKey,
      consumerSecret: application.consumerSecret
    });
    this.channelSelector = new ChannelSelector({
      twitterAccount: this.twitterAccount
    });
  }

  get propertiesForView() {
    return {
      channelSelector: this.channelSelector,
      defaultWebBrowser: this.defaultWebBrowser,
      onAnchorClicked: this.onAnchorClicked.bind(this),
      onChannelClicked: this.onChannelClicked.bind(this),
      onFavoriteButtonClicked: this.onFavoriteButtonClicked.bind(this),
      onSearchQueryStringSubmitted: this.onSearchQueryStringSubmitted.bind(this),
      onTweetSubmitted: this.onTweetSubmitted.bind(this),
      onUnfavoriteButtonClicked: this.onUnfavoriteButtonClicked.bind(this),
      twitterAccount: this.twitterAccount
    }
  }

  focusSearchBox() {
    const textField = document.querySelector('#search-text-field')
    textField.focus();
    textField.select();
  }

  onAnchorClicked(url) {
    this.defaultWebBrowser.openUrl(url);
  }

  onChannelClicked(channelId) {
    this.channelSelector.selectChannel(channelId);
  }

  onFavoriteButtonClicked(tweetId) {
    this.twitterAccount.favorite({ tweetId });
  }

  onSearchQueryStringSubmitted(queryString) {
    this.channelSelector.selectSearchChannel();
    this.twitterAccount.searchTweets({ queryString });
    this.twitterAccount.subscribeFilteredStream({ queryString });
  }

  onTweetSubmitted(text) {
    this.twitterAccount.postTweet(text);
  }

  onUnfavoriteButtonClicked(tweetId) {
    this.twitterAccount.unfavorite({ tweetId });
  }

  renderView() {
    React.render(
      <Root {...this.propertiesForView} />,
      document.body
    );
  }

  run() {
    this.subscribeDomainEvents();
    this.subscribeIpc();
    this.subscribeKeyboardEvents();
    this.renderView();
    this.twitterAccount.fetchUser();
  }

  subscribeDomainEvents() {
    domainEventPublisher.subscribe((domainEvent) => {
      store.dispatch(domainEvent);
    }).on('USER_FETCHED', (domainEvent) => {
      this.twitterAccount.fetchLists({ user: domainEvent.user });
      this.twitterAccount.fetchHomeTimelineTweets({ user: domainEvent.user });
      this.twitterAccount.subscribeUserStream({ user: domainEvent.user });
    }).on('FAVORITE_RECEIVED', ({ data }) => {
      this.desktopNotifier.notifyFavorite(data);
    }).on('RETWEET_RECEIVED', ({ tweet }) => {
      this.desktopNotifier.notifyRetweet({ tweet });
    });
  }

  subscribeIpc() {
    ipc.on('focus-search-box', () => {
      this.focusSearchBox();
    });
    ipc.on('select-next-channel', () => {
      this.channelSelector.selectNextChannel();
    });
    ipc.on('select-previous-channel', () => {
      this.channelSelector.selectPreviousChannel();
    });
  }

  subscribeKeyboardEvents() {
    this.keyboardEventEmitter.on('J', (event) => {
      event.preventDefault();
      this.tweetSelector.selectNextTweet();
    }).on('K', (event) => {
      event.preventDefault();
      this.tweetSelector.selectPreviousTweet();
    });
  }
}
