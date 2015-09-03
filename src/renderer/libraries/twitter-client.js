import { EventEmitter } from 'events'
import remote from 'remote';
const Twitter = require('twitter');

class TwitterClient {
  constructor({ accessToken, accessTokenSecret, consumerKey, consumerSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
  }

  fetchAccount() {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'account/verify_credentials',
        (error, account, response) => {
          resolve({ account: account, response: response });
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

  fetchTweets({ screenName }) {
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

  fetchTweetsFromList({ listId }) {
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
          eventEmitter.emit('tweeted', data);
        });
      }
    );
    return eventEmitter;
  }

  /*
   * @param {Object} user User is used to detect retweet event
   * @return {EventEmitter}
   */
  subscribeStream({ user }) {
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
          } else if (data.created_at && data.retweeted_status && data.retweeted_status.user.id_str == user.id_str) {
            eventEmitter.emit('retweet', data);
          } else if (data.created_at) {
            eventEmitter.emit('tweet', data);
          }
        });
      }
    );
    return eventEmitter;
  }
}

const application = remote.getGlobal('application');
export default new TwitterClient({
  accessToken: application.accessToken,
  accessTokenSecret: application.accessTokenSecret,
  consumerKey: application.consumerKey,
  consumerSecret: application.consumerSecret
});
