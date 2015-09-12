import domainEventPublisher from '../singletons/domain-event-publisher'
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

  favorite({ tweetId }) {
    this.twitterClient.favorite({ tweetId }).then(({ tweet }) => {
      domainEventPublisher.publish({
        tweet,
        type: 'TWEET_FAVORITED'
      });
    });
  }

  fetchHomeTimelineTweets({ user }) {
    this.twitterClient.fetchHomeTimelineTweets({ screenName: user.screen_name }).then(({ tweets }) => {
      domainEventPublisher.publish({
        tweets,
        type: 'HOME_TIMELINE_TWEETS_FETCHED'
      });
    });
  }

  fetchLists({ user }) {
    this.twitterClient.fetchLists().then(({ lists }) => {
      domainEventPublisher.publish({
        lists,
        type: 'LISTS_FETCHED'
      });
    });
  }

  fetchListTweets({ listId }) {
    this.twitterClient.fetchListTweets({ listId }).then(({ tweets }) => {
      domainEventPublisher.publish({
        tweets,
        type: 'LIST_TWEETS_FETCHED'
      });
    });
  }

  fetchUser() {
    return this.twitterClient.fetchUser().then(({ user }) => {
      domainEventPublisher.publish({
        user,
        type: 'USER_FETCHED'
      });
      return { user };
    });
  }

  postTweet(text) {
    this.twitterClient.postTweet({ text }).then(({ tweet }) => {
      domainEventPublisher.publish({
        tweet,
        type: 'TWEET_POSTED'
      });
    });
  }

  searchTweets({ queryString }) {
    this.twitterClient.searchTweets({ queryString }).then(({ tweets }) => {
      domainEventPublisher.publish({
        tweets,
        type: 'TWEETS_SEARCHED'
      });
    });
  }

  subscribeFilteredStream({ queryString }) {
    this.twitterClient.subscribeFilteredStream({ queryString }).on('tweet', (tweet) => {
      domainEventPublisher.publish({
        tweet,
        type: 'FILTERED_TWEET_RECEIVED'
      });
    });
  }

  subscribeUserStream({ user }) {
    return this.twitterClient.subscribeUserStream({
      user
    }).on('tweet', (tweet) => {
      domainEventPublisher.publish({
        tweet,
        type: 'HOME_TIMELINE_TWEET_RECEIVED'
      });
    }).on('favorite', (data) => {
      domainEventPublisher.publish({
        data,
        type: 'FAVORITE_RECEIVED'
      });
    }).on('retweet', (tweet) => {
      domainEventPublisher.publish({
        tweet,
        type: 'RETWEET_RECEIVED'
      });
    });
  }

  unfavorite({ tweetId }) {
    this.twitterClient.unfavorite({ tweetId }).then(({ tweet }) => {
      domainEventPublisher.publish({
        tweet,
        type: 'TWEET_UNFAVORITED'
      });
    });
  }
}
