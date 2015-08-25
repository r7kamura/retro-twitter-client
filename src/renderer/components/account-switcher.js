import React from 'react';

export default class AccountSwitcher extends React.Component {
  render() {
    return(
      <div className="account-switcher">
        <ul className="accounts">
          <li className="accounts-item accounts-item-selected">
            <img className="accounts-item-avatar" src={this.props.account.profile_image_url} />
            <div className="accounts-item-key">
              &#x2318;1
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
