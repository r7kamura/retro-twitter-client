import Application from './application'
import React from 'react';
import store from '../singletons/store'

export default class StoreSubscriber extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => this.setState(store.getState()));
  }

  render() {
    return <Application {...this.state} />;
  }
}
