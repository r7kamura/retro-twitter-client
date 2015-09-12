import _ from 'lodash'
import ChannelSelector from '../command-models/channel-selector'
import DefaultWebBrowser from '../command-models/default-web-browser'
import DesktopNotifier from '../command-models/desktop-notifier'
import domainEventPublisher from '../singletons/domain-event-publisher'
import ipc from 'ipc'
import KeyboardEventPublisher from '../libraries/keyboard-event-publisher'
import SearchBoxSelector from '../command-models/search-box-selector'
import store from '../singletons/store'
import TweetSelector from '../command-models/tweet-selector'
import TwitterAccount from '../command-models/twitter-account'
import twitterSignature from '../singletons/twitter-signature'
import viewEventPublisher from '../singletons/view-event-publisher'
import ViewRenderer from '../command-models/view-renderer'

export default class Application {
  constructor() {
    this.channelSelector = new ChannelSelector();
    this.defaultWebBrowser = new DefaultWebBrowser();
    this.desktopNotifier = new DesktopNotifier();
    this.keyboardEventPublisher = new KeyboardEventPublisher();
    this.searchBoxSelector = new SearchBoxSelector();
    this.tweetSelector = new TweetSelector();
    this.twitterAccount = new TwitterAccount(twitterSignature);
    this.viewRenderer = new ViewRenderer();
  }

  run() {
    this.subscribeDomainEvents();
    this.subscribeIpcEvents();
    this.subscribeKeyboardEvents();
    this.subscribeViewEvents();
    this.viewRenderer.render();
    this.twitterAccount.fetchUser();
  }

  subscribeDomainEvents() {
    domainEventPublisher.subscribe((domainEvent) => {
      store.dispatch(domainEvent);
    }).on('FAVORITE_RECEIVED', ({ data }) => {
      this.desktopNotifier.notifyFavorite(data);
    }).on('LIST_CHANNEL_SELECTED', ({ listId }) => {
      this.twitterAccount.fetchListTweets({ listId });
    }).on('RETWEET_RECEIVED', ({ tweet }) => {
      this.desktopNotifier.notifyRetweet({ tweet });
    }).on('USER_FETCHED', ({ user }) => {
      this.twitterAccount.fetchHomeTimelineTweets({ user });
      this.twitterAccount.fetchLists({ user });
      this.twitterAccount.subscribeUserStream({ user });
    });
  }

  subscribeIpcEvents() {
    ipc.on('select-search-box', () => {
      this.searchBoxSelector.select();
    });
    ipc.on('select-next-channel', () => {
      this.channelSelector.selectNextChannel();
    });
    ipc.on('select-previous-channel', () => {
      this.channelSelector.selectPreviousChannel();
    });
  }

  subscribeKeyboardEvents() {
    this.keyboardEventPublisher.on('J', (event) => {
      event.preventDefault();
      this.tweetSelector.selectNextTweet();
    }).on('K', (event) => {
      event.preventDefault();
      this.tweetSelector.selectPreviousTweet();
    });
  }

  subscribeViewEvents() {
    viewEventPublisher.on('anchor-clicked', (url) => {
      this.defaultWebBrowser.openUrl(url);
    }).on('channel-clicked', (channelId) => {
      this.channelSelector.selectChannel(channelId);
    }).on('favorite-button-clicked', (tweetId) => {
      this.twitterAccount.favorite({ tweetId });
    }).on('search-query-string-submitted', (queryString) => {
      this.channelSelector.selectSearchChannel();
      this.twitterAccount.searchTweets({ queryString });
      this.twitterAccount.subscribeFilteredStream({ queryString });
    }).on('tweet-submitted', (text) => {
      this.twitterAccount.postTweet(text);
    }).on('unfavorite-button-clicked', (tweetId) => {
      this.twitterAccount.unfavorite({ tweetId });
    });
  }
}
