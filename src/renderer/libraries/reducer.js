import {
  LIST_TWEETS_CLEARED,
  HOME_TIMELINE_CHANNEL,
  MAX_TWEETS_COUNT,
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

const account = (state = {}, action) => {
  switch (action.type) {
  case ACCOUNT_UPDATED:
    return action.account;
  default:
    return state;
  }
};

const channelId = (state = HOME_TIMELINE_CHANNEL, action) => {
  switch (action.type) {
  case SELECT_CHANNEL:
    return action.channelId;
  default:
    return state;
  }
};

const homeTimelineTweets = (state = [], action) => {
  switch (action.type) {
  case HOME_TIMELINE_TWEET_UPDATED:
    return [action.tweet, ...state].slice(0, MAX_TWEETS_COUNT);
  case HOME_TIMELINE_TWEETS_UPDATED:
    return [...action.tweets, ...state].slice(0, MAX_TWEETS_COUNT);
  default:
    return state;
  }
};

const listId = (state = null, action) => {
  switch (action.type) {
  case SELECT_CHANNEL:
    switch (action.channelId) {
    case HOME_TIMELINE_CHANNEL:
    case SEARCH_CHANNEL:
      return state;
    default:
      return action.channelId;
    }
  default:
    return state;
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
  case LISTS_UPDATED:
    return [...state, ...action.lists];
  default:
    return state;
  }
};

const listTweets = (state = [], action) => {
  switch (action.type) {
  case LIST_TWEETS_CLEARED:
    return [];
  case LIST_TWEETS_UPDATED:
    return [...action.tweets, ...state];
  default:
    return state;
  }
};

const searchedTweets = (state = [], action) => {
  switch (action.type) {
  case SEARCHED_TWEET_UPDATED:
    return [action.tweet, ...state];
  case SEARCHED_TWEETS_UPDATED:
    return [...action.tweets, ...state];
  default:
    return state;
  }
};

export default (state = {}, action) => {
  return {
    account: account(state.account, action),
    channelId: channelId(state.channelId, action),
    homeTimelineTweets: homeTimelineTweets(state.homeTimelineTweets, action),
    lists: lists(state.lists, action),
    listId: listId(state.listId, action),
    listTweets: listTweets(state.listTweets, action),
    searchedTweets: searchedTweets(state.searchedTweets, action)
  };
}
