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
   * Merge given tweets into this store, then an emit changed event.
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
