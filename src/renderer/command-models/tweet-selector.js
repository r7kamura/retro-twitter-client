import domainEventPublisher from '../singletons/domain-event-publisher'

export default class TweetSelector {
  selectNextTweet() {
    domainEventPublisher.publish({
      type: 'NEXT_TWEET_SELECTED'
    });
  }

  selectPreviousTweet() {
    domainEventPublisher.publish({
      type: 'PREVIOUS_TWEET_SELECTED'
    });
  }
}
