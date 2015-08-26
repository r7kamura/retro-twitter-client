import { applyMiddleware, createStore } from 'redux'
import { fetchAccount, fetchTweets, fetchLists, subscribeStream } from './action-creators'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from './reducer'
import Root from './components/root'
import thunkMiddleware from 'redux-thunk'

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

store.dispatch(fetchAccount());
store.dispatch(fetchTweets());
store.dispatch(fetchLists());
store.dispatch(subscribeStream());

React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  document.body
);
