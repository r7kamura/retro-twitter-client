import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from './reducer'
import Root from './components/root'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const store = applyMiddleware(thunkMiddleware, createLogger())(createStore)(reducer);

React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  document.body
);
