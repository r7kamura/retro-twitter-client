import React from 'react/addons'
import Retweet from './retweet'
import Tweet from './tweet'

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Tweets extends React.Component {
  render() {
    return(
      <CSSTransitionGroup className="tweets" component="ul" transitionName="tweet">
        {this.renderTweets()}
      </CSSTransitionGroup>
    );
  }

  renderTweets() {
    return this.props.tweets.map((tweet) => {
      if (tweet.retweeted_status) {
        return <Retweet key={tweet.id_str} onAnchorClicked={this.props.onAnchorClicked} tweet={tweet} />
      } else {
        return <Tweet key={tweet.id_str} onAnchorClicked={this.props.onAnchorClicked} tweet={tweet} />
      }
    });
  }
}
