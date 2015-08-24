import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import Main from './main'
import React from 'react';
import twitterActions from '../actions/twitter-actions'

export default class Application extends React.Component {
  componentDidMount() {
    twitterActions.fetchTweets();
  }

  render() {
    return(
      <div className="body-inner">
        <AccountSwitcher />
        <ContextSwitcher />
        <Main />
      </div>
    );
  }
}
