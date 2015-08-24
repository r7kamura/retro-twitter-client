import accountStore from '../stores/account-store';
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import homeTimelineStore from '../stores/home-timeline-store';
import Main from './main'
import React from 'react';
import twitterClient from '../twitter-client';

export default class Root extends React.Component {
  componentDidMount() {
    twitterClient.fetchAccount().then(({ account, response }) => {
      accountStore.updateAccount(account);
    });
    twitterClient.fetchTweets().then(({ response, tweets }) => {
      homeTimelineStore.mergeTweets(tweets);
    });
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
