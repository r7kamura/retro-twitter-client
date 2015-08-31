import { HOME_TIMELINE, SEARCH_CHANNEL } from '../constants'
import List from './list';
import React from 'react';

export default class ContextSwitcher extends React.Component {
  getHomeChannelClassName() {
    return `account-channel ${this.getHomeChannelSelected() ? ' account-channel-selected' : ''}`;
  }

  getHomeChannelSelected() {
    return this.props.channelId === HOME_TIMELINE;
  }

  getSearchChannelClassName() {
    return `account-channel ${this.getSearchChannelSelected() ? ' account-channel-selected' : ''}`;
  }

  getSearchChannelSelected() {
    return this.props.channelId === SEARCH_CHANNEL;
  }

  onHomeChannelClicked(event) {
    this.props.onChannelClicked(HOME_TIMELINE);
  }

  onSearchChannelClicked(event) {
    this.props.onChannelClicked(SEARCH_CHANNEL);
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
      return <List channelId={this.props.channelId} key={list.id_str} list={list} onChannelClicked={this.props.onChannelClicked} />;
    });
  }
}
