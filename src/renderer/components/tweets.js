import React from 'react'
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
      return <Tweet key={tweet.id_str} tweet={tweet} />
    });
  }
}
