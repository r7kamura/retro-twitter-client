import Application from './application'
import applicationState from '../singletons/application-state'
import React from 'react';
import ViewState from '../libraries/view-state'

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = new ViewState(applicationState);
    applicationState.on('changed', () => this.setState(new ViewState(applicationState)));
  }

  render() {
    return <Application {...this.state} />;
  }
}
