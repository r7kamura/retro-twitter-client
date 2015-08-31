import { openExternal } from 'shell'
import twitterClient from './twitter-client';
import {
  CLEAR_LIST_TWEETS,
  HOME_TIMELINE,
  SEARCH_CHANNEL,
  SELECT_CHANNEL,
  UPDATE_ACCOUNT,
  UPDATE_HOME_TIMELINE_TWEET,
  UPDATE_HOME_TIMELINE_TWEETS,
  UPDATE_LIST_TWEETS,
  UPDATE_LISTS,
  UPDATE_SEARCHED_TWEET,
  UPDATE_SEARCHED_TWEETS
} from './constants'

function clearListTweets() {
  return {
    type: CLEAR_LIST_TWEETS
  }
}

export function fetchAccount() {
  return (dispatch) => {
    twitterClient.fetchAccount().then(({ account }) => {
      dispatch(updateAccount(account));
      dispatch(fetchLists(account));
    });
  };
}

export function fetchTweets(account) {
  return (dispatch) => {
    twitterClient.fetchTweets({ screenName: account.screen_name }).then(({ tweets }) => {
      dispatch(updateHomeTimelineTweets(tweets));
      dispatch(subscribeStream());
    });
  };
}

export function fetchTweetsFromList(listId) {
  return (dispatch) => {
    twitterClient.fetchTweetsFromList({ listId }).then(({ tweets }) => {
      dispatch(updateListTweets(tweets));
    });
  };
}

export function fetchLists(account) {
  return (dispatch) => {
    twitterClient.fetchLists().then(({ lists }) => {
      dispatch(updateLists(lists));
      dispatch(fetchTweets(account));
    });
  };
}

export function openUrl(url) {
  openExternal(url);
  return {
    url,
    type: OPEN_URL
  }
}

export function postTweet(text) {
  return (dispatch) => {
    twitterClient.postTweet({ text }).then(({ tweet }) => {
      dispatch(updateHomeTimelineTweet(tweet));
    });
  };
}

export function searchTweets(queryString) {
  return (dispatch) => {
    twitterClient.searchTweets({ queryString }).then(({ tweets }) => {
      dispatch(updateSearchedTweets(tweets));
      dispatch(subscribeFilteredStream({ queryString }));
    });
  };
}

export function selectChannel(channelId) {
  return (dispatch, getState) => {
    switch (channelId) {
    case HOME_TIMELINE:
      break;
    case SEARCH_CHANNEL:
      break;
    default:
      if (getState().listId !== channelId) {
        dispatch(clearListTweets());
      }
      dispatch(fetchTweetsFromList(channelId));
      break;
    }
    dispatch({
      channelId,
      type: SELECT_CHANNEL
    });
  };
}

export function selectNextChannel() {
  return (dispatch, getState) => {
    switch (getState().channelId) {
    case HOME_TIMELINE:
      dispatch(selectChannel(SEARCH_CHANNEL));
      break;
    case SEARCH_CHANNEL:
      if (getState().lists.length > 0) {
        dispatch(selectChannel(getState().lists[0].id_str));
        break;
      }
    default:
      dispatch(selectChannel(HOME_TIMELINE));
    }
  };
}

export function selectPreviousChannel() {
  return (dispatch, getState) => {
    switch (getState().channelId) {
    case HOME_TIMELINE:
      if (getState().lists.length > 0) {
        dispatch(selectChannel(getState().lists[0].id_str));
        break;
      }
    case SEARCH_CHANNEL:
      dispatch(selectChannel(HOME_TIMELINE));
      break;
    default:
      dispatch(selectChannel(SEARCH_CHANNEL));
    }
  };
}

function subscribeFilteredStream({ queryString }) {
  return (dispatch) => {
    twitterClient.subscribeFilteredStream({ queryString }).on('tweeted', (tweet) => {
      dispatch(updateSearchedTweet(tweet));
    });
  };
}

function subscribeStream() {
  return (dispatch) => {
    twitterClient.subscribeStream().on('tweeted', (tweet) => {
      dispatch(updateHomeTimelineTweet(tweet));
    });
  };
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

function updateListTweets(tweets) {
  return {
    tweets,
    type: UPDATE_LIST_TWEETS
  }
}

function updateSearchedTweet(tweet) {
  return {
    tweet,
    type: UPDATE_SEARCHED_TWEET
  }
}

function updateSearchedTweets(tweets) {
  return {
    tweets,
    type: UPDATE_SEARCHED_TWEETS
  }
}
