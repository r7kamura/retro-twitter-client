import { HOME_TIMELINE_CHANNEL, SEARCH_CHANNEL } from '../constants'
import Editor from './editor'
import React from 'react'
import Tweets from './tweets'

export default class Main extends React.Component {
  getTweets() {
    switch (this.props.channelId) {
    case HOME_TIMELINE_CHANNEL:
      return this.props.homeTimeline;
    case SEARCH_CHANNEL:
      return this.props.searchedTweets;
    default:
      return this.props.listTweets;
    }
  }

  render() {
    return(
      <main className="main">
        <Editor key="editor" postTweet={this.props.postTweet} />
        <Tweets key={this.props.channelId} onAnchorClicked={this.props.onAnchorClicked} tweets={this.getTweets()} />
      </main>
    );
  }
}
