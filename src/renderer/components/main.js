import Editor from './editor'
import React from 'react'
import Tweets from './tweets'

export default class Main extends React.Component {
  render() {
    return(
      <main className="main">
        <Editor key="editor" />
        <Tweets key="tweets" onAnchorClicked={this.props.onAnchorClicked} tweets={this.props.tweets} />
      </main>
    );
  }
}
