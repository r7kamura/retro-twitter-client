import React from 'react'
import Retweet from './retweet'
import Tweet from './tweet'

export default class Tweets extends React.Component {
  getClassName() {
    return `tweets${this.props.selected ? '' : ' tweets-hidden'}`;
  }

  render() {
    return(
      <div className={this.getClassName()}>
        {this.renderTweets()}
      </div>
    );
  }

  renderTweets() {
    return this.props.tweets.map((tweet) => {
      if (tweet.retweeted_status) {
        return <Retweet
          key={tweet.id_str}
          onAnchorClicked={this.props.onAnchorClicked}
          onFavoriteButtonClicked={this.props.onFavoriteButtonClicked}
          onUnfavoriteButtonClicked={this.props.onUnfavoriteButtonClicked}
          tweet={tweet}
        />
      } else {
        return <Tweet
          key={tweet.id_str}
          onAnchorClicked={this.props.onAnchorClicked}
          onFavoriteButtonClicked={this.props.onFavoriteButtonClicked}
          onUnfavoriteButtonClicked={this.props.onUnfavoriteButtonClicked}
          tweet={tweet}
        />
      }
    });
  }
}
