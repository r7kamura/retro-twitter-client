import React from 'react';
import AccountSwitcher from './account-switcher'
import ContextSwitcher from './context-switcher'
import Main from './main'

export default class Application extends React.Component {
  render() {
    return(
      <div className="body-inner">
        <AccountSwitcher />
        <ContextSwitcher />
        <Main />
      </div>
    );
  }
}
