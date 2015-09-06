import AccountSwitcher from './account-switcher'
import ChannelSwitcher from './channel-switcher'
import Main from './main'
import React from 'react';
import store from '../singletons/store'

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => this.setState(store.getState()));
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher
          account={this.state.user}
        />
        <ChannelSwitcher
          account={this.state.user}
          channelId={this.state.channelId}
          lists={this.state.lists}
          onChannelClicked={this.props.onChannelClicked}
        />
        <Main
          channelId={this.state.channelId}
          homeTimelineTweets={this.state.homeTimelineTweets}
          lists={this.state.lists}
          listTweets={this.state.listTweets}
          onAnchorClicked={this.props.onAnchorClicked}
          onSearchQueryStringSubmitted={this.props.onSearchQueryStringSubmitted}
          onTweetSubmitted={this.props.onTweetSubmitted}
          searchedTweets={this.state.searchedTweets}
        />
      </div>
    );
  }
}
