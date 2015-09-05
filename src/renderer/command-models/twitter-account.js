import store from '../singletons/store'
import TwitterClient from '../libraries/twitter-client'

export default class TwitterAccount {
  constructor({ accessToken, accessTokenSecret, consumerKey, consumerSecret }) {
    this.twitterClient = new TwitterClient({
      accessToken,
      accessTokenSecret,
      consumerKey,
      consumerSecret
    });
  }

  fetchAndSubscribeUserData() {
    this.fetchUser().then(({ user }) => {
      this.fetchLists({ user });
      this.fetchHomeTimelineTweets({ user });
      this.subscribeUserStream({ user });
    });
  }

  fetchHomeTimelineTweets({ user }) {
    this.twitterClient.fetchHomeTimelineTweets({ screenName: user.screen_name }).then(({ tweets }) => {
      store.dispatch({
        tweets,
        type: 'HOME_TIMELINE_TWEETS_FETCHED'
      });
    });
  }

  fetchLists({ user }) {
    this.twitterClient.fetchLists().then(({ lists }) => {
      store.dispatch({
        lists,
        type: 'LISTS_FETCHED'
      });
    });
  }

  fetchListTweets({ listId }) {
    this.twitterClient.fetchListTweets({ listId }).then(({ tweets }) => {
      store.dispatch({
        tweets,
        type: 'LIST_TWEETS_FETCHED'
      });
    });
  }

  fetchUser() {
    return this.twitterClient.fetchUser().then(({ user }) => {
      store.dispatch({
        user,
        type: 'USER_FETCHED'
      });
      return { user };
    });
  }

  postTweet(text) {
    this.twitterClient.postTweet({ text }).then(({ tweet }) => {
      store.dispatch({
        tweet,
        type: 'TWEET_POSTED'
      });
    });
  }

  searchTweets({ queryString }) {
    this.twitterClient.searchTweets({ queryString }).then(({ tweets }) => {
      store.dispatch({
        tweets,
        type: 'TWEETS_SEARCHED'
      });
    });
  }

  subscribeFilteredStream({ queryString }) {
    this.twitterClient.subscribeFilteredStream({ queryString }).on('tweet', (tweet) => {
      store.dispatch({
        tweet,
        type: 'FILTERED_TWEET_RECEIVED'
      });
    });
  }

  subscribeUserStream({ user }) {
    this.twitterClient.subscribeUserStream({
      user
    }).on('tweet', (tweet) => {
      store.dispatch({
        tweet,
        type: 'HOME_TIMELINE_TWEET_RECEIVED'
      });
    }).on('favorite', (data) => {
      store.dispatch({
        data,
        type: 'FAVORITE_RECEIVED'
      });
    }).on('retweet', (tweet) => {
      store.dispatch({
        tweet,
        type: 'RETWEET_RECEIVED'
      });
    });
  }
}
