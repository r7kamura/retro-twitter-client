import { connect } from 'react-redux'
import { fetchAccount, fetchTweets, fetchLists, openUrl, postTweet, searchTweets, selectChannel, subscribeStream } from '../action-creators'
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import Main from './main'
import React from 'react';

class Root extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAccount());
    this.props.dispatch(fetchLists());
  }

  onAnchorClicked(url) {
    this.props.dispatch(openUrl(url));
  }

  onChannelClicked(contextId) {
    this.props.dispatch(selectChannel(contextId));
  }

  postTweet(text) {
    this.props.dispatch(postTweet(text));
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher account={this.props.account} />
        <ContextSwitcher account={this.props.account} context={this.props.context} lists={this.props.lists} onChannelClicked={this.onChannelClicked.bind(this)} />
        <Main context={this.props.context} onAnchorClicked={this.onAnchorClicked.bind(this)} postTweet={this.postTweet.bind(this)} homeTimeline={this.props.homeTimeline} listTweets={this.props.listTweets} searchedTweets={this.props.searchedTweets} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Root);
