import { EventEmitter } from 'events'
import remote from 'remote';
const Twitter = remote.require('twitter');

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


  fetchTweets() {
    return new Promise((resolve, reject) => {
      this.getTwitter().get(
        'statuses/home_timeline',
        {
          screen_name: 'r7kamura'
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

  /*
   * @return {EventEmitter}
   */
  subscribeStream() {
    const eventEmitter = new EventEmitter();
    this.getTwitter().stream(
      'user',
      (stream) => {
        stream.on('data', (data) => {
          if (data['friends']) {
          } else if (data['event']) {
          } else if (data['friends']) {
          } else if (data['delete']) {
          } else if (data['created_at']) {
            eventEmitter.emit('tweeted', data);
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
