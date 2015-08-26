import accountStore from '../stores/account-store';
import AccountSwitcher from './account-switcher'
import { connect } from 'react-redux'
import ContextSwitcher from './context-switcher'
import homeTimelineStore from '../stores/home-timeline-store';
import listsStore from '../stores/lists-store';
import Main from './main'
import React from 'react';

class Root extends React.Component {
  render() {
    return(
      <div className="root">
        <AccountSwitcher account={this.props.account} />
        <ContextSwitcher account={this.props.account} lists={this.props.lists} />
        <Main tweets={this.props.homeTimeline} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Root);
