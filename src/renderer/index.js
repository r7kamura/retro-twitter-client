import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { updateAccount, updateLists, updateHomeTimelineTweet, updateHomeTimelineTweets } from './action-creators'
import React from 'react'
import reducer from './reducer'
import Root from './components/root'
import twitterClient from './twitter-client';

const store = createStore(reducer);

twitterClient.fetchAccount().then(({ account }) => {
  store.dispatch(updateAccount(account));
});

twitterClient.fetchTweets().then(({ tweets }) => {
  store.dispatch(updateHomeTimelineTweets(tweets));
});

twitterClient.fetchLists().then(({ lists }) => {
  store.dispatch(updateLists(lists));
});

twitterClient.subscribeStream().on('tweeted', (tweet) => {
  store.dispatch(updateHomeTimelineTweet(tweet));
});

React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  document.body
);
