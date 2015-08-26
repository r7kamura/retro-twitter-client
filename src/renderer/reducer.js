const account = (state = {}, action) => {
  switch (action.type) {
  case 'UPDATE_ACCOUNT':
    return action.account;
  default:
    return state;
  }
};

const homeTimeline = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_HOME_TIMELINE_TWEET':
    return [action.tweet, ...state];
  case 'UPDATE_HOME_TIMELINE_TWEETS':
    return [...action.tweets, ...state];
  default:
    return state;
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_LISTS':
    return [...state, ...action.lists];
  default:
    return state;
  }
}

export default (state = {}, action) => {
  return {
    account: account(state.account, action),
    homeTimeline: homeTimeline(state.homeTimeline, action),
    lists: lists(state.lists, action)
  };
}