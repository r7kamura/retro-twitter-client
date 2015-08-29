import {
  SELECT_CHANNEL,
  UPDATE_ACCOUNT,
  UPDATE_HOME_TIMELINE_TWEET,
  UPDATE_HOME_TIMELINE_TWEETS,
  UPDATE_LIST_TWEETS,
  UPDATE_LISTS,
  UPDATE_SEARCHED_TWEET,
  UPDATE_SEARCHED_TWEETS
} from './action-creators'

const account = (state = {}, action) => {
  switch (action.type) {
  case UPDATE_ACCOUNT:
    return action.account;
  default:
    return state;
  }
};

const context = (state = 'homeTimeline', action) => {
  switch (action.type) {
  case SELECT_CHANNEL:
    return action.channelId;
  default:
    return state;
  }
};

const homeTimeline = (state = [], action) => {
  switch (action.type) {
  case UPDATE_HOME_TIMELINE_TWEET:
    return [action.tweet, ...state];
  case UPDATE_HOME_TIMELINE_TWEETS:
    return [...action.tweets, ...state];
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
  case SELECT_CHANNEL:
    return [];
  case UPDATE_LIST_TWEETS:
    return action.tweets;
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
    context: context(state.context, action),
    homeTimeline: homeTimeline(state.homeTimeline, action),
    lists: lists(state.lists, action),
    listTweets: listTweets(state.listTweets, action),
    searchedTweets: searchedTweets(state.searchedTweets, action)
  };
}
