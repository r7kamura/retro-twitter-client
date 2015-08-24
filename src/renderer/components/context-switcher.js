import React from 'react';
import accountStore from '../stores/account-store'

export default class ContextSwitcher extends React.Component {
  constructor() {
    super();
    this.state = { account: {} };
  }

  componentDidMount() {
    accountStore.on('changed', () => {
      this.setState({ account: this.getStateFromStore() });
    });
  }

  getStateFromStore() {
    return accountStore.getAccount();
  }

  render() {
    return(
      <div className="context-switcher">
        <div className="account-screen-name">
          @{this.state.account.screen_name}
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
