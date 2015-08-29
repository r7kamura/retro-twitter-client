import List from './list';
import React from 'react';

export default class ContextSwitcher extends React.Component {
  getHomeChannelClassName() {
    return `account-channel ${this.getHomeChannelSelected() ? ' account-channel-selected' : ''}`;
  }

  getHomeChannelSelected() {
    return this.props.context === 'homeTimeline';
  }

  getSearchChannelClassName() {
    return `account-channel ${this.getSearchChannelSelected() ? ' account-channel-selected' : ''}`;
  }

  getSearchChannelSelected() {
    return this.props.context === 'search';
  }

  onHomeChannelClicked(event) {
    this.props.onChannelClicked('homeTimeline');
  }

  onSearchChannelClicked(event) {
    this.props.onChannelClicked('search');
  }

  render() {
    return(
      <div className="context-switcher">
        <div className="account-screen-name">
          @{this.props.account.screen_name}
        </div>
        <div className="account-section">
          <h3 className="account-section-heading">
            TIMELINES
          </h3>
          <ul>
            <li className={this.getHomeChannelClassName()} onClick={this.onHomeChannelClicked.bind(this)}>
              home
            </li>
            <li className={this.getSearchChannelClassName()} onClick={this.onSearchChannelClicked.bind(this)}>
              search
            </li>
          </ul>
        </div>
        <div className="account-section">
          <h3 className="account-section-heading">
            LISTS
          </h3>
          <ul>
            {this.renderLists()}
          </ul>
        </div>
      </div>
    );
  }

  renderLists() {
    return this.props.lists.map((list) => {
      return <List context={this.props.context} key={list.id_str} list={list} onChannelClicked={this.props.onChannelClicked} />;
    });
  }
}
