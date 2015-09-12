import store from '../singletons/store'

export default class TweetSelector {
  selectNextTweet() {
    store.dispatch({
      type: 'NEXT_TWEET_SELECTED'
    });
  }

  selectPreviousTweet() {
    store.dispatch({
      type: 'PREVIOUS_TWEET_SELECTED'
    });
  }
}
