import List from './list';
import React from 'react';
import viewEventPublisher from '../singletons/view-event-publisher'

export default class ChannelSwitcher extends React.Component {
  getHomeChannelClassName() {
    return `account-channel ${this.getHomeChannelSelected() ? ' account-channel-selected' : ''}`;
  }

  getHomeChannelSelected() {
    return this.props.channelId === 'HOME_TIMELINE_CHANNEL';
  }

  getSearchChannelClassName() {
    return `account-channel ${this.getSearchChannelSelected() ? ' account-channel-selected' : ''}`;
  }

  getSearchChannelSelected() {
    return this.props.channelId === 'SEARCH_CHANNEL';
  }

  onHomeChannelClicked(event) {
    viewEventPublisher.emit('channel-clicked', 'HOME_TIMELINE_CHANNEL');
  }

  onSearchChannelClicked(event) {
    viewEventPublisher.emit('channel-clicked', 'SEARCH_CHANNEL');
  }

  render() {
    return(
      <div className="channel-switcher">
        <div className="account-screen-name">
          @{this.props.account.screen_name}
        </div>
        <div className="account-section">
          <h3 className="account-section-heading">
            TIMELINES
          </h3>
          <ul>
            <li className={this.getHomeChannelClassName()} onClick={this.onHomeChannelClicked.bind(this)}>
              Home
            </li>
            <li className={this.getSearchChannelClassName()} onClick={this.onSearchChannelClicked.bind(this)}>
              Search
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
      return <List channelId={this.props.channelId} key={list.id_str} list={list} />;
    });
  }
}
