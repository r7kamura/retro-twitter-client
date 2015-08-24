import accountStore from '../stores/account-store';
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import homeTimelineStore from '../stores/home-timeline-store';
import Main from './main'
import React from 'react';
import twitterClient from '../twitter-client';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: accountStore.getAccount(),
      tweets: homeTimelineStore.getTweets()
    };
  }

  componentDidMount() {
    twitterClient.fetchAccount().then(({ account, response }) => {
      accountStore.updateAccount(account);
    });
    twitterClient.fetchTweets().then(({ response, tweets }) => {
      homeTimelineStore.mergeTweets(tweets);
    });
    accountStore.on('changed', () => {
      this.setState({ account: accountStore.getAccount() });
    });
    homeTimelineStore.on('changed', () => {
      this.setState({ tweets: homeTimelineStore.getTweets() });
    });
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher />
        <ContextSwitcher account={this.state.account} />
        <Main tweets={this.state.tweets} />
      </div>
    );
  }
}
