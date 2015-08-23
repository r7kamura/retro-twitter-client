import React from 'react';

export default class AccountSwitcher extends React.Component {
  render() {
    return(
      <div className="account-switcher">
        <ul className="accounts">
          <li className="accounts-item accounts-item-selected">
            <img className="accounts-item-avatar" src="https://pbs.twimg.com/profile_images/519846472406151169/5GrJiV-2_400x400.jpeg" />
            <div className="accounts-item-key">
              &#x2318;1
            </div>
          </li>
          <li className="accounts-item">
            <img className="accounts-item-avatar" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_4_400x400.png" />
            <div className="accounts-item-key">
              &#x2318;2
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
