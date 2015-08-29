import { connect } from 'react-redux'
import { fetchAccount, fetchTweets, fetchLists, openUrl, selectList, subscribeStream } from '../action-creators'
import accountStore from '../stores/account-store';
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import homeTimelineStore from '../stores/home-timeline-store';
import listsStore from '../stores/lists-store';
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

  onListClicked(listId) {
    this.props.dispatch(selectList(listId));
  }

  render() {
    return(
      <div className="root">
        <AccountSwitcher account={this.props.account} />
        <ContextSwitcher account={this.props.account} context={this.props.context} lists={this.props.lists} onListClicked={this.onListClicked.bind(this)} />
        <Main onAnchorClicked={this.onAnchorClicked.bind(this)} tweets={this.props.homeTimeline} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Root);
