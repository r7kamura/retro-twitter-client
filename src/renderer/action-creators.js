import twitterClient from './twitter-client';

export const SELECT_LIST = 'SELECT_LIST';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_HOME_TIMELINE_TWEET = 'UPDATE_HOME_TIMELINE_TWEET';
export const UPDATE_HOME_TIMELINE_TWEETS = 'UPDATE_HOME_TIMELINE_TWEETS';
export const UPDATE_LISTS = 'UPDATE_LISTS';

export function fetchAccount() {
  return (dispatch) => {
    twitterClient.fetchAccount().then(({ account }) => {
      dispatch(updateAccount(account));
    });
  };
}

export function fetchTweets() {
  return (dispatch) => {
    twitterClient.fetchTweets().then(({ tweets }) => {
      dispatch(updateHomeTimelineTweets(tweets));
    });
  };
}

export function fetchLists() {
  return (dispatch) => {
    twitterClient.fetchLists().then(({ lists }) => {
      dispatch(updateLists(lists));
    });
  };
}

export function subscribeStream() {
  return (dispatch) => {
    twitterClient.subscribeStream().on('tweeted', (tweet) => {
      dispatch(updateHomeTimelineTweet(tweet));
    });
  };
}

export function selectList(listId) {
  return {
    listId,
    type: SELECT_LIST
  }
}

function updateAccount(account) {
  return {
    account,
    type: UPDATE_ACCOUNT
  };
}

function updateHomeTimelineTweet(tweet) {
  return {
    tweet,
    type: UPDATE_HOME_TIMELINE_TWEET
  };
}

function updateHomeTimelineTweets(tweets) {
  return {
    tweets,
    type: UPDATE_HOME_TIMELINE_TWEETS
  };
}

function updateLists(lists) {
  return {
    lists,
    type: UPDATE_LISTS
  };
}
