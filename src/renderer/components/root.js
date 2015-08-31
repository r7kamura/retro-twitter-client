import { connect } from 'react-redux'
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import ipc from 'ipc'
import Main from './main'
import React from 'react';
import {
  fetchAccount,
  fetchTweets,
  fetchLists,
  openUrl,
  postTweet,
  searchTweets,
  selectChannel,
  selectNextChannel,
  subscribeStream
} from '../action-creators'

class Root extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAccount());
    ipc.on('select-next-channel-requested', () => {
      this.props.dispatch(selectNextChannel());
    });
  }

  onAnchorClicked(url) {
    this.props.dispatch(openUrl(url));
  }

  onChannelClicked(channelId) {
    this.props.dispatch(selectChannel(channelId));
  }

  postTweet(text) {
    this.props.dispatch(postTweet(text));
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher account={this.props.account} />
        <ContextSwitcher account={this.props.account} channelId={this.props.channelId} lists={this.props.lists} onChannelClicked={this.onChannelClicked.bind(this)} />
        <Main channelId={this.props.channelId} onAnchorClicked={this.onAnchorClicked.bind(this)} postTweet={this.postTweet.bind(this)} homeTimeline={this.props.homeTimeline} listTweets={this.props.listTweets} searchedTweets={this.props.searchedTweets} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Root);
