export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_HOME_TIMELINE_TWEET = 'UPDATE_HOME_TIMELINE_TWEET';
export const UPDATE_HOME_TIMELINE_TWEETS = 'UPDATE_HOME_TIMELINE_TWEETS';
export const UPDATE_LISTS = 'UPDATE_LISTS';

export function updateAccount(account) {
  return {
    account,
    type: UPDATE_ACCOUNT
  };
}

export function updateHomeTimelineTweet(tweet) {
  return {
    tweet,
    type: UPDATE_HOME_TIMELINE_TWEET
  };
}

export function updateHomeTimelineTweets(tweets) {
  return {
    tweets,
    type: UPDATE_HOME_TIMELINE_TWEETS
  };
}

export function updateLists(lists) {
  return {
    lists,
    type: UPDATE_LISTS
  };
}
