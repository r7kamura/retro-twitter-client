import React from 'react';

export default class List extends React.Component {
  render() {
    return(
      <li className="account-list">
        # {this.props.list.name}
      </li>
    );
  }
}
