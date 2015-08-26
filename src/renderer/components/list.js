import React from 'react';

export default class List extends React.Component {
  getClassName() {
    return `account-list ${this.getSelected() ? ' account-list-selected' : ''}`;
  }

  getSelected() {
    return this.props.list.id_str === this.props.context;
  }

  onListClicked() {
    this.props.onListClicked(this.props.list.id_str);
  }

  render() {
    return(
      <li className={this.getClassName()} key={this.props.list.id_str} onClick={this.onListClicked.bind(this)}>
        # {this.props.list.name}
      </li>
    );
  }
}
