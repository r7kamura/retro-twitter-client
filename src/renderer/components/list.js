import React from 'react';

export default class List extends React.Component {
  getClassName() {
    return `account-channel ${this.getSelected() ? ' account-channel-selected' : ''}`;
  }

  getSelected() {
    return this.props.list.id_str === this.props.context;
  }

  onChannelClicked() {
    this.props.onChannelClicked(this.props.list.id_str);
  }

  render() {
    return(
      <li className={this.getClassName()} key={this.props.list.id_str} onClick={this.onChannelClicked.bind(this)}>
        @{this.props.list.user.screen_name}/{this.props.list.name}
      </li>
    );
  }
}
