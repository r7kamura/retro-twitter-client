import applicationState from '../singletons/application-state'
import domainEventPublisher from '../singletons/domain-event-publisher'

export default class TweetSelector {
  selectTweet(tweetId) {
    domainEventPublisher.publish({
      tweetId,
      type: 'TWEET_SELECTED'
    });
  }

  selectNextTweet() {
    this.selectTweet(applicationState.nextTweetId);
  }

  selectPreviousTweet() {
    this.selectTweet(applicationState.previousTweetId);
  }
}
