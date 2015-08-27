import React from 'react'
import Retweet from './retweet'
import Tweet from './tweet'

export default class Tweets extends React.Component {
  render() {
    return(
      <ul className="tweets">
        {this.renderTweets()}
      </ul>
    );
  }

  renderTweets() {
    return this.props.tweets.map((tweet) => {
      if (tweet.retweeted_status) {
        return <Retweet key={tweet.id_str} tweet={tweet} />
      } else {
        return <Tweet key={tweet.id_str} tweet={tweet} />
      }
    });
  }
}
