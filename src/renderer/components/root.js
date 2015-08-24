import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import Main from './main'
import React from 'react';
import twitterActions from '../actions/twitter-actions'

export default class Root extends React.Component {
  componentDidMount() {
    twitterActions.fetchTweets();
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher />
        <ContextSwitcher />
        <Main />
      </div>
    );
  }
}
