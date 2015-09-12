import React from 'react'
import Root from '../components/root'

export default class ViewRenderer {
  render() {
    React.render(<Root/>, document.body);
  }
}
