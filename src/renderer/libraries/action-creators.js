import { openExternal } from 'shell'
import twitterClient from './twitter-client';
import {
  LIST_TWEETS_CLEARED,
  HOME_TIMELINE_CHANNEL,
  OPEN_URL,
  SEARCH_CHANNEL,
  SELECT_CHANNEL,
  ACCOUNT_UPDATED,
  HOME_TIMELINE_TWEET_UPDATED,
  HOME_TIMELINE_TWEETS_UPDATED,
  LIST_TWEETS_UPDATED,
  LISTS_UPDATED,
  SEARCHED_TWEET_UPDATED,
  SEARCHED_TWEETS_UPDATED
} from './constants'

function listTweetsCleared() {
  return {
    type: LIST_TWEETS_CLEARED
  }
}

export function fetchAccount() {
  return (dispatch) => {
    twitterClient.fetchAccount().then(({ account }) => {
      dispatch(accountUpdated(account));
      dispatch(fetchLists(account));
    });
  };
}

export function fetchTweets(user) {
  return (dispatch) => {
    twitterClient.fetchTweets({ screenName: user.screen_name }).then(({ tweets }) => {
      dispatch(homeTimelineTweetsUpdated(tweets));
      dispatch(subscribeStream({ user }));
    });
  };
}

export function fetchTweetsFromList(listId) {
  return (dispatch) => {
    twitterClient.fetchTweetsFromList({ listId }).then(({ tweets }) => {
      dispatch(listTweetsUpdated(tweets));
    });
  };
}

export function fetchLists(account) {
  return (dispatch) => {
    twitterClient.fetchLists().then(({ lists }) => {
      dispatch(listsUpdated(lists));
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
      dispatch(homeTimelineTweetUpdated(tweet));
    });
  };
}

export function searchTweets(queryString) {
  return (dispatch) => {
    twitterClient.searchTweets({ queryString }).then(({ tweets }) => {
      dispatch(searchedTweetsUpdated(tweets));
      dispatch(subscribeFilteredStream({ queryString }));
    });
  };
}

export function selectChannel(channelId) {
  return (dispatch, getState) => {
    switch (channelId) {
    case HOME_TIMELINE_CHANNEL:
      break;
    case SEARCH_CHANNEL:
      break;
    default:
      if (getState().listId !== channelId) {
        dispatch(listTweetsCleared());
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
    case HOME_TIMELINE_CHANNEL:
      dispatch(selectChannel(SEARCH_CHANNEL));
      break;
    case SEARCH_CHANNEL:
      if (getState().lists.length > 0) {
        dispatch(selectChannel(getState().lists[0].id_str));
        break;
      } else {
        dispatch(selectChannel(HOME_TIMELINE_CHANNEL));
        break;
      }
    default:
      const channelId = getState().channelId;
      const lists = getState().lists;
      let index = -1;
      for (var i = 0; i < lists.length; i++) {
        index++;
        if (lists[i].id_str === channelId) {
          break;
        }
      }
      if (-1 < index && index < getState().lists.length - 1) {
        dispatch(selectChannel(lists[index + 1].id_str));
      } else {
        dispatch(selectChannel(HOME_TIMELINE_CHANNEL));
      }
    }
  };
}

export function selectPreviousChannel() {
  return (dispatch, getState) => {
    switch (getState().channelId) {
    case HOME_TIMELINE_CHANNEL:
      if (getState().lists.length > 0) {
        dispatch(selectChannel(getState().lists[getState().lists.length - 1].id_str));
        break;
      }
    case SEARCH_CHANNEL:
      dispatch(selectChannel(HOME_TIMELINE_CHANNEL));
      break;
    default:
      const channelId = getState().channelId;
      const lists = getState().lists;
      let index = -1;
      for (var i = 0; i < lists.length; i++) {
        index++;
        if (lists[i].id_str === channelId) {
          break;
        }
      }
      if (index - 1 >= 0) {
        dispatch(selectChannel(lists[index - 1].id_str));
      } else {
        dispatch(selectChannel(SEARCH_CHANNEL));
      }
    }
  };
}

function subscribeFilteredStream({ queryString }) {
  return (dispatch) => {
    twitterClient.subscribeFilteredStream({ queryString }).on('tweet', (tweet) => {
      dispatch(searchedTweetUpdated(tweet));
    });
  };
}

function subscribeStream({ user }) {
  return (dispatch) => {
    twitterClient.subscribeStream({ user }).on('tweet', (tweet) => {
      dispatch(homeTimelineTweetUpdated(tweet));
    }).on('favorite', (data) => {
      new Notification(
        `${data.source.screen_name} favorited your Tweet`,
        {
          body: data.target_object.text,
          icon: data.source.profile_image_url
        }
      );
    }).on('retweet', (tweet) => {
      new Notification(
        `${tweet.user.screen_name} retweeted your Tweet`,
        {
          body: tweet.retweeted_status.text,
          icon: tweet.user.profile_image_url
        }
      );
    });
  };
}

function accountUpdated(account) {
  return {
    account,
    type: ACCOUNT_UPDATED
  };
}

function homeTimelineTweetUpdated(tweet) {
  return {
    tweet,
    type: HOME_TIMELINE_TWEET_UPDATED
  };
}

function homeTimelineTweetsUpdated(tweets) {
  return {
    tweets,
    type: HOME_TIMELINE_TWEETS_UPDATED
  };
}

function listsUpdated(lists) {
  return {
    lists,
    type: LISTS_UPDATED
  };
}

function listTweetsUpdated(tweets) {
  return {
    tweets,
    type: LIST_TWEETS_UPDATED
  }
}

function searchedTweetUpdated(tweet) {
  return {
    tweet,
    type: SEARCHED_TWEET_UPDATED
  }
}

function searchedTweetsUpdated(tweets) {
  return {
    tweets,
    type: SEARCHED_TWEETS_UPDATED
  }
}
