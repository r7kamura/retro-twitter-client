import React from 'react';

export default class ContextSwitcher extends React.Component {
  render() {
    return(
      <div className="context-switcher">
        <div className="account-screen-name">
          @{this.props.account.screen_name}
        </div>
        <div className="account-lists">
          <h3 className="account-lists-heading">
            Lists
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
      return(
        <li className="account-list" key={list.id_str}>
          # {list.name}
        </li>
      );
    });
  }
}
