import _ from 'lodash'

const channelId = (state = 'HOME_TIMELINE_CHANNEL', action) => {
  switch (action.type) {
  case 'CHANNEL_SELECTED':
    return action.channelId;
  default:
    return state;
  }
};

const homeTimelineTweets = (state = [], action) => {
  switch (action.type) {
  case 'HOME_TIMELINE_TWEET_RECEIVED':
    return [action.tweet, ...state].slice(0, 100);
  case 'HOME_TIMELINE_TWEETS_FETCHED':
    return [...action.tweets, ...state].slice(0, 100);
  case 'TWEET_FAVORITED':
  case 'TWEET_UNFAVORITED':
    const index = _.findIndex(state, (tweet) => {
      return tweet.id_str === action.tweet.id_str;
    });
    if (index === -1) {
      return state;
    } else {
      return [
        ...state.slice(0, index),
        action.tweet,
        ...state.slice(index + 1, -1)
      ];
    }
  default:
    return state;
  }
};

const listId = (state = null, action) => {
  switch (action.type) {
  case 'CHANNEL_SELECTED':
    switch (action.channelId) {
    case 'HOME_TIMELINE_CHANNEL':
    case 'SEARCH_CHANNEL':
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
  case 'LISTS_FETCHED':
    return [...state, ...action.lists];
  default:
    return state;
  }
};

const listTweets = (state = [], action) => {
  switch (action.type) {
  case 'LIST_TWEETS_CLEAR':
    return [];
  case 'LIST_TWEETS_FETCHED':
    return [...action.tweets, ...state];
  case 'TWEET_FAVORITED':
  case 'TWEET_UNFAVORITED':
    const index = _.findIndex(state, (tweet) => {
      return tweet.id_str === action.tweet.id_str;
    });
    if (index === -1) {
      return state;
    } else {
      return [
        ...state.slice(0, index),
        action.tweet,
        ...state.slice(index + 1, -1)
      ];
    }
  default:
    return state;
  }
};

const searchedTweets = (state = [], action) => {
  switch (action.type) {
  case 'FILTERED_TWEET_RECEIVED':
    return [action.tweet, ...state];
  case 'TWEETS_SEARCHED':
    return [...action.tweets, ...state];
  case 'TWEET_FAVORITED':
  case 'TWEET_UNFAVORITED':
    const index = _.findIndex(state, (tweet) => {
      return tweet.id_str === action.tweet.id_str;
    });
    if (index === -1) {
      return state;
    } else {
      return [
        ...state.slice(0, index),
        action.tweet,
        ...state.slice(index + 1, -1)
      ];
    }
  default:
    return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
  case 'USER_FETCHED':
    return action.user;
  default:
    return state;
  }
};

export default (state = {}, action) => {
  return {
    user: user(state.user, action),
    channelId: channelId(state.channelId, action),
    homeTimelineTweets: homeTimelineTweets(state.homeTimelineTweets, action),
    lists: lists(state.lists, action),
    listId: listId(state.listId, action),
    listTweets: listTweets(state.listTweets, action),
    searchedTweets: searchedTweets(state.searchedTweets, action)
  };
}
