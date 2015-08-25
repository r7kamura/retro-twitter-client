import accountStore from '../stores/account-store';
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import homeTimelineStore from '../stores/home-timeline-store';
import listsStore from '../stores/lists-store';
import Main from './main'
import React from 'react';
import twitterClient from '../twitter-client';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: accountStore.getAccount(),
      lists: listsStore.getLists(),
      tweets: homeTimelineStore.getTweets()
    };
  }

  componentDidMount() {
    accountStore.on('changed', () => {
      this.setState({ account: accountStore.getAccount() });
    });
    homeTimelineStore.on('changed', () => {
      this.setState({ tweets: homeTimelineStore.getTweets() });
    });
    listsStore.on('changed', () => {
      this.setState({ lists: listsStore.getLists() });
    });
    twitterClient.fetchAccount().then(({ account, response }) => {
      accountStore.updateAccount(account);
    });
    twitterClient.fetchTweets().then(({ response, tweets }) => {
      homeTimelineStore.mergeTweets(tweets);
    });
    twitterClient.fetchLists().then(({ response, lists }) => {
      listsStore.mergeLists(lists);
    });
    twitterClient.subscribeStream().on('tweeted', (tweet) => {
      homeTimelineStore.mergeTweet(tweet);
    });
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher account={this.state.account} />
        <ContextSwitcher account={this.state.account} lists={this.state.lists} />
        <Main tweets={this.state.tweets} />
      </div>
    );
  }
}
