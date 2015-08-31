import { Provider } from 'react-redux'
import React from 'react'
import Root from './components/root'
import store from './libraries/store'

React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  document.body
);
