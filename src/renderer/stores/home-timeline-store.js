import { EventEmitter } from 'events'

class HomeTimelineStore extends EventEmitter {
  constructor() {
    super();
    this.tweetsTable = {};
  }

  /**
   * @todo Sort
   * @return {Array<Object>} An array of raw tweets fetched from Twitter API
   */
  getTweets() {
    return Object.keys(this.tweetsTable).map((key) => {
      return this.tweetsTable[key];
    });
  }

  /**
   * Merge a given tweet into this store, then emit a changed event.
   * @param {Object} tweet
   */
  mergeTweet(tweet) {
    this.tweetsTable[tweet.id_str] = tweet;
    this.emit('changed');
  }

  /**
   * Merge given batch of tweets into this store, then emit a changed event.
   * @param {Array.<Object>} tweets
   */
  mergeTweets(tweets) {
    tweets.forEach((tweet) => {
      this.tweetsTable[tweet.id_str] = tweet;
    });
    this.emit('changed');
  }
}

export default new HomeTimelineStore();
