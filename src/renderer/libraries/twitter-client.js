import { EventEmitter } from 'events'
const Twitter = require('twitter');

export default class TwitterClient {
  constructor({ accessToken, accessTokenSecret, consumerKey, consumerSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  favorite({ tweetId }) {
    return new Promise((resolve, reject) => {
      this.getTwitter().post(
        'favorites/create',
        { id: tweetId },
        (error, tweet, response) => {
          resolve({ response: response, tweet: tweet });
        }
      );
    });
  }

  fetchUser() {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'account/verify_credentials',
        (error, user, response) => {
          resolve({ user: user, response: response });
        }
      );
    });
  }

  fetchLists() {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'lists/list',
        (error, lists, response) => {
          resolve({ lists: lists, response: response });
        }
      );
    });
  }

  fetchHomeTimelineTweets({ screenName }) {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'statuses/home_timeline',
        {
          screen_name: screenName
        },
        (error, tweets, response) => {
          resolve({ tweets: tweets, response: response });
        }
      );
    });
  }

  fetchListTweets({ listId }) {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'lists/statuses',
        {
          list_id: listId
        },
        (error, tweets, response) => {
          resolve({ tweets: tweets, response: response });
        }
      );
    });
  }

  getTwitter() {
    if (!this.twitter) {
      this.twitter = new Twitter({
        access_token_key: this.accessToken,
        access_token_secret: this.accessTokenSecret,
        consumer_key: this.consumerKey,
        consumer_secret: this.consumerSecret
      });
    }
    return this.twitter;
  }

  postTweet({ text }) {
    return new Promise((resolve, reject) => {
      this.getTwitter().post(
        'statuses/update',
        {
          status: text
        },
        (error, tweet, response) => {
          resolve({ tweet: tweet, response: response });
        }
      );
    });
  }

  searchTweets({ queryString }) {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'search/tweets',
        {
          q: queryString
        },
        (error, data, response) => {
          resolve({ tweets: data.statuses, response: response });
        }
      );
    });
  }

  /*
   * @return {EventEmitter}
   */
  subscribeFilteredStream({ queryString }) {
    const eventEmitter = new EventEmitter();
    this.getTwitter().stream(
      'statuses/filter',
      {
        track: queryString
      },
      (stream) => {
        stream.on('data', (data) => {
          eventEmitter.emit('tweet', data);
        });
      }
    );
    return eventEmitter;
  }

  /*
   * @param {Object} user User is used to detect retweet event
   * @return {EventEmitter}
   */
  subscribeUserStream({ user }) {
    const eventEmitter = new EventEmitter();
    this.getTwitter().stream(
      'user',
      (stream) => {
        stream.on('follow', (data) => {
          eventEmitter.emit('follow', data);
        });
        stream.on('block', (data) => {
          eventEmitter.emit('block', data);
        });
        stream.on('favorite', (data) => {
          eventEmitter.emit('favorite', data);
        });
        stream.on('list_created', (data) => {
          eventEmitter.emit('list_created', data);
        });
        stream.on('list_destroyed', (data) => {
          eventEmitter.emit('list_destroyed', data);
        });
        stream.on('list_member_added', (data) => {
          eventEmitter.emit('list_member_added', data);
        });
        stream.on('list_member_removed', (data) => {
          eventEmitter.emit('list_member_removed', data);
        });
        stream.on('list_updated', (data) => {
          eventEmitter.emit('list_updated', data);
        });
        stream.on('list_user_subscribed', (data) => {
          eventEmitter.emit('list_user_subscribed', data);
        });
        stream.on('list_user_unsubscribed', (data) => {
          eventEmitter.emit('list_user_unsubscribed', data);
        });
        stream.on('unblock', (data) => {
          eventEmitter.emit('unblock', data);
        });
        stream.on('unfavorite', (data) => {
          eventEmitter.emit('unfavorite', data);
        });
        stream.on('user_update', (data) => {
          eventEmitter.emit('user_update', data);
        });
        stream.on('data', (data) => {
          if (data.friends) {
            eventEmitter.emit('friends', data);
          } else if (data.event) {
          } else if (data.delete) {
            eventEmitter.emit('delete', data);
          } else if (data.created_at) {
            if (data.retweeted_status && data.retweeted_status.user.id_str == user.id_str) {
              eventEmitter.emit('retweet', data);
            }
            eventEmitter.emit('tweet', data);
          }
        });
      }
    );
    return eventEmitter;
  }

  unfavorite({ tweetId }) {
    return new Promise((resolve, reject) => {
      this.getTwitter().post(
        'favorites/destroy',
        { id: tweetId },
        (error, tweet, response) => {
          resolve({ response: response, tweet: tweet });
        }
      );
    });
  }
}
