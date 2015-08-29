import Editor from './editor'
import React from 'react'
import Tweets from './tweets'

export default class Main extends React.Component {
  getTweets() {
    switch (this.props.context) {
    case 'homeTimeline':
      return this.props.homeTimeline;
    case 'search':
      return this.props.searchedTweets;
    default:
      return this.props.listTweets;
    }
  }

  render() {
    return(
      <main className="main">
        <Editor key="editor" postTweet={this.props.postTweet} />
        <Tweets key={this.props.context} onAnchorClicked={this.props.onAnchorClicked} tweets={this.getTweets()} />
      </main>
    );
  }
}
