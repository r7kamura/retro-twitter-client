import React from 'react';
import viewEventPublisher from '../singletons/view-event-publisher'

export default class List extends React.Component {
  getClassName() {
    return `account-channel ${this.getIsSelected() ? ' account-channel-selected' : ''}`;
  }

  getIsSelected() {
    return this.props.list.id_str === this.props.channelId;
  }

  onChannelClicked() {
    viewEventPublisher.emit('channel-clicked', this.props.list.id_str);
  }

  render() {
    return(
      <li className={this.getClassName()} key={this.props.list.id_str} onClick={this.onChannelClicked.bind(this)}>
        @{this.props.list.user.screen_name}/{this.props.list.name}
      </li>
    );
  }
}
