import React from 'react';

export default class ContextSwitcher extends React.Component {
  render() {
    return(
      <div className="context-switcher">
        <div className="account-screen-name">
          @r7kamura
        </div>
        <div className="account-lists">
          <h3 className="account-lists-heading">
            Lists
          </h3>
          <ul>
            <li className="account-list account-list-selected">
              # electron
            </li>
            <li className="account-list">
              # node
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
