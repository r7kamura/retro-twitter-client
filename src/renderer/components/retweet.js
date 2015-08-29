import React from 'react'
import Time from './time'
import twitterText from 'twitter-text'

export default class Retweet extends React.Component {
  render() {
    return(
      <li className="tweet" key={this.props.tweet.id_str}>
        <div className="tweet-sub">
          <div className="tweet-avatar-parent">
            <img className="tweet-avatar" src={this.props.tweet.retweeted_status.user.profile_image_url} height="48" width="48" />
            <img className="tweet-avatar-child" src={this.props.tweet.user.profile_image_url} height="24" width="24" />
          </div>
        </div>
        <div className="tweet-main">
          <div className="tweet-header">
            <div className="tweet-names">
              <span className="tweet-display-name">
                {this.props.tweet.retweeted_status.user.name}
              </span>
              <span className="tweet-screen-name">
                @{this.props.tweet.retweeted_status.user.screen_name}
              </span>
              <span className="tweet-retweeter-display-name">
                <i className="fa fa-retweet"></i>
                {' '}
                {this.props.tweet.user.name}
              </span>
            </div>
            <Time className="tweet-datetime" time={this.props.tweet.created_at} />
          </div>
          <div className="tweet-body" dangerouslySetInnerHTML={{__html: twitterText.autoLink(this.props.tweet.retweeted_status.text, {urlEntities: this.props.tweet.retweeted_status.entities.urls})}} />
        </div>
      </li>
    );
  }
}
