import {
  CLEAR_LIST_TWEETS,
  HOME_TIMELINE_CHANNEL,
  MAX_TWEETS_COUNT,
  SEARCH_CHANNEL,
  SELECT_CHANNEL,
  UPDATE_ACCOUNT,
  UPDATE_HOME_TIMELINE_CHANNEL_TWEET,
  UPDATE_HOME_TIMELINE_CHANNEL_TWEETS,
  UPDATE_LIST_TWEETS,
  UPDATE_LISTS,
  UPDATE_SEARCHED_TWEET,
  UPDATE_SEARCHED_TWEETS
} from './constants'

const account = (state = {}, action) => {
  switch (action.type) {
  case UPDATE_ACCOUNT:
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
  case UPDATE_HOME_TIMELINE_CHANNEL_TWEET:
    return [action.tweet, ...state].slice(0, MAX_TWEETS_COUNT);
  case UPDATE_HOME_TIMELINE_CHANNEL_TWEETS:
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
  case UPDATE_LISTS:
    return [...state, ...action.lists];
  default:
    return state;
  }
};

const listTweets = (state = [], action) => {
  switch (action.type) {
  case CLEAR_LIST_TWEETS:
    return [];
  case UPDATE_LIST_TWEETS:
    return [...action.tweets, ...state];
  default:
    return state;
  }
};

const searchedTweets = (state = [], action) => {
  switch (action.type) {
  case UPDATE_SEARCHED_TWEET:
    return [action.tweet, ...state];
  case UPDATE_SEARCHED_TWEETS:
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
