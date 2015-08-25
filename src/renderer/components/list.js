import React from 'react';

export default class List extends React.Component {
  render() {
    return(
      <li className="account-list" key={this.props.list.id_str}>
        # {this.props.list.name}
      </li>
    );
  }
}
