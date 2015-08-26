import {
  SELECT_LIST,
  UPDATE_ACCOUNT,
  UPDATE_HOME_TIMELINE_TWEET,
  UPDATE_HOME_TIMELINE_TWEETS,
  UPDATE_LISTS
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
  case SELECT_LIST:
    return action.listId;
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
}

export default (state = {}, action) => {
  return {
    account: account(state.account, action),
    context: context(state.context, action),
    homeTimeline: homeTimeline(state.homeTimeline, action),
    lists: lists(state.lists, action)
  };
}
