import AccountSwitcher from './account-switcher'
import ChannelSwitcher from './channel-switcher'
import Main from './main'
import React from 'react';

export default class Application extends React.Component {
  render() {
    return(
      <div className="application">
        <AccountSwitcher
          account={this.props.user}
        />
        <ChannelSwitcher
          account={this.props.user}
          channelId={this.props.channelId}
          lists={this.props.lists}
        />
        <Main
          channelId={this.props.channelId}
          homeTimelineTweets={this.props.homeTimelineTweets}
          lists={this.props.lists}
          listTweets={this.props.listTweets}
          searchedTweets={this.props.searchedTweets}
        />
      </div>
    );
  }
}
