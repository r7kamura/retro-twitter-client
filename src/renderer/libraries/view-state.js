import listRepository from '../singletons/list-repository'
import tweetRepository from '../singletons/tweet-repository'
import userRepository from '../singletons/user-repository'

export default class ViewState {
  constructor(applicationState) {
    this.channelId = applicationState.channelId;
    this.homeTimelineTweets = applicationState.homeTimelineTweetIds.map((tweetId) => tweetRepository.find(tweetId));
    this.listId = applicationState.listId;
    this.lists = applicationState.listIds.map((listId) => listRepository.find(listId));
    this.listTweets = applicationState.listTweetIds.map((tweetId) => tweetRepository.find(tweetId));
    this.searchedTweets = applicationState.searchedTweetIds.map((tweetId) => tweetRepository.find(tweetId));
    this.user = userRepository.find(applicationState.userId) || {};
  }
}
