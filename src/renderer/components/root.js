import AccountSwitcher from './account-switcher'
import ContextSwitcher from './channel-switcher'
import Main from './main'
import React from 'react';
import store from '../singletons/store'

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher
          account={this.state.user}
        />
        <ContextSwitcher
          account={this.state.user}
          channelId={this.state.channelId}
          lists={this.state.lists}
          onChannelClicked={this.props.onChannelClicked}
        />
        <Main
          channelId={this.state.channelId}
          homeTimelineTweets={this.state.homeTimelineTweets}
          listTweets={this.state.listTweets}
          onAnchorClicked={this.props.onAnchorClicked}
          onTweetSubmitted={this.props.onTweetSubmitted}
          searchedTweets={this.state.searchedTweets}
        />
      </div>
    );
  }
}
