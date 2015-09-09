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
      onFavoriteButtonClicked: this.onFavoriteButtonClicked.bind(this),
      onSearchQueryStringSubmitted: this.onSearchQueryStringSubmitted.bind(this),
      onTweetSubmitted: this.onTweetSubmitted.bind(this),
      onUnfavoriteButtonClicked: this.onUnfavoriteButtonClicked.bind(this),
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
    this.twitterAccount.fetchUser().then(({ user }) => {
      this.twitterAccount.fetchLists({ user });
      this.twitterAccount.fetchHomeTimelineTweets({ user });
      this.twitterAccount.subscribeUserStream({
        user
      }).on('favorite', (data) => {
        this.onFavoriteReceived(data);
      }).on('retweet', (tweet) => {
        this.onRetweetReceived({ tweet });
      });
    });
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

  onFavoriteReceived({ source, target_object }) {
    new Notification(
      `${source.screen_name} favorited your Tweet`,
      {
        body: target_object.text,
        icon: source.profile_image_url
      }
    );
  }

  onRetweetReceived({ tweet }) {
    new Notification(
      `${tweet.user.screen_name} retweeted your Tweet`,
      {
        body: tweet.retweeted_status.text,
        icon: tweet.user.profile_image_url
      }
    );
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
