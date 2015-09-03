import { HOME_TIMELINE_CHANNEL, SEARCH_CHANNEL } from '../libraries/constants'
import Editor from './editor'
import React from 'react'
import Tweets from './tweets'

export default class Main extends React.Component {
  isHomeTimelineSelected() {
    return this.props.channelId === HOME_TIMELINE_CHANNEL;
  }

  isListSelected() {
    return !this.isHomeTimelineSelected() && !this.isSearchSelected();
  }

  isSearchSelected() {
    return this.props.channelId === SEARCH_CHANNEL;
  }

  getTweets() {
    switch (this.props.channelId) {
    case HOME_TIMELINE_CHANNEL:
      return this.props.homeTimelineTweets;
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
        <Tweets selected={this.isHomeTimelineSelected()} onAnchorClicked={this.props.onAnchorClicked} tweets={this.props.homeTimelineTweets} />
        <Tweets selected={this.isSearchSelected()} onAnchorClicked={this.props.onAnchorClicked} tweets={this.props.searchedTweets} />
        <Tweets selected={this.isListSelected()} onAnchorClicked={this.props.onAnchorClicked} tweets={this.props.listTweets} />
      </main>
    );
  }
}
