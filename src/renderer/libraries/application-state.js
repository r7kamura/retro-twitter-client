import _ from 'lodash'
import { EventEmitter } from 'events'
import listRepository from '../singletons/list-repository'
import tweetRepository from '../singletons/tweet-repository'
import userRepository from '../singletons/user-repository'

export default class ApplicationState extends EventEmitter {
  constructor() {
    super();
    this.initializeState();
    this.subscribeDomainEvents();
  }

  get nextChannelId() {
    switch (this.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      return 'SEARCH_CHANNEL';
    case 'SEARCH_CHANNEL':
      if (this.listIds.length > 0) {
        return this.listIds[0];
      } else {
        return 'HOME_TIMELINE_CHANNEL';
      }
    default:
      const index = _.findIndex(this.listIds, (listId) => listId === this.channelId);
      if (-1 < index && index < this.listIds.length - 1) {
        return this.listIds[index + 1];
      } else {
        return 'HOME_TIMELINE_CHANNEL';
      }
    }
  }

  get previousChannelId() {
    switch (this.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
      if (this.listIds.length > 0) {
        return this.listIds[this.listIds.length - 1];
      } else {
        return 'SEARCH_CHANNEL';
      }
    case 'SEARCH_CHANNEL':
      return 'HOME_TIMELINE_CHANNEL';
    default:
      const index = _.findIndex(this.listIds, (listId) => listId === this.channelId);
      if (index - 1 >= 0) {
        return this.listIds[index - 1];
      } else {
        return 'SEARCH_CHANNEL';
      }
    }
  }

  initializeState() {
    this.channelId = 'HOME_TIMELINE_CHANNEL';
    this.homeTimelineTweetIds = [];
    this.listId = null;
    this.listIds = [];
    this.listTweetIds = [];
    this.searchedTweetIds = [];
    this.userId = {};
  }

  subscribeDomainEvents() {
    this.on('CHANNEL_SELECTED', ({ channelId }) => {
      this.channelId = channelId;
      this.emit('changed');
    }).on('HOME_TIMELINE_TWEET_RECEIVED', ({ tweet }) => {
      this.updateRepositoriesFromTweet(tweet);
      this.homeTimelineTweetIds = [tweet.id_str, ...this.homeTimelineTweetIds];
      this.emit('changed');
    }).on('HOME_TIMELINE_TWEETS_FETCHED', ({ tweets }) => {
      tweets.forEach((tweet) => this.updateRepositoriesFromTweet(tweet));
      this.homeTimelineTweetIds = [...tweets.map((tweet) => tweet.id_str), ...this.homeTimelineTweetIds];
      this.emit('changed');
    }).on('LIST_CHANNEL_SELECTED', ({ listId }) => {
      this.listId = listId;
      this.emit('changed');
    }).on('LISTS_FETCHED', ({ lists }) => {
      lists.forEach((list) => listRepository.update(list));
      this.listIds = [...lists.map((list) => list.id_str), ...this.listIds];
      this.emit('changed');
    }).on('LIST_TWEETS_CLEARED', () => {
      this.listTweetIds = [];
      this.emit('changed');
    }).on('LIST_TWEETS_FETCHED', ({ tweets }) => {
      tweets.forEach((tweet) => this.updateRepositoriesFromTweet(tweet));
      this.listTweetIds = [...tweets.map((tweet) => tweet.id_str), ...this.listTweetIds];
      this.emit('changed');
    }).on('TWEET_FAVORITED', ({ tweet }) => {
      this.updateRepositoriesFromTweet(tweet);
      this.emit('changed');
    }).on('TWEET_POSTED', ({ tweet }) => {
      this.updateRepositoriesFromTweet(tweet);
      this.homeTimelineTweetIds = [tweet.id_str, ...this.homeTimelineTweetIds];
      this.emit('changed');
    }).on('TWEET_UNFAVORITED', ({ tweet }) => {
      this.updateRepositoriesFromTweet(tweet);
      this.emit('changed');
    }).on('TWEETS_SEARCHED', ({ tweets }) => {
      tweets.forEach((tweet) => this.updateRepositoriesFromTweet(tweet));
      this.searchedTweetIds = [...tweets.map((tweet) => tweet.id_str), ...this.searchedTweetIds];
      this.emit('changed');
    }).on('USER_FETCHED', ({ user }) => {
      userRepository.update(user);
      this.userId = user.id_str;
      this.emit('changed');
    });
  }

  updateRepositoriesFromTweet(tweet) {
    tweetRepository.update(tweet);
    userRepository.update(tweet.user);
    if (tweet.retweeted_status) {
      this.updateRepositoriesFromTweet(tweet.retweeted_status);
    }
  }
}
