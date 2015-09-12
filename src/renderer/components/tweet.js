import FavoriteButton from './favorite-button'
import React from 'react'
import Time from './time'
import TweetBody from './tweet-body'
import UnfavoriteButton from './unfavorite-button'
import viewEventPublisher from '../singletons/view-event-publisher'

export default class Tweet extends React.Component {
  get favoriteButton() {
    if (this.props.tweet.favorited) {
      return <UnfavoriteButton tweet={this.props.tweet} />;
    } else {
      return <FavoriteButton tweet={this.props.tweet} />;
    }
  }

  get url() {
    return `https://twitter.com/${this.props.tweet.user.screen_name}/status/${this.props.tweet.id_str}`;
  }

  onAnchorClicked(event) {
    event.preventDefault();
    viewEventPublisher.emit('anchor-clicked', event.currentTarget.href);
  }

  render() {
    return(
      <li className="tweet" key={this.props.tweet.id_str}>
        <div className="tweet-sub">
          <img className="tweet-avatar" src={this.props.tweet.user.profile_image_url} height="48" width="48" />
        </div>
        <div className="tweet-main">
          <div className="tweet-header">
            <div className="tweet-names">
              <span className="tweet-display-name">
                {this.props.tweet.user.name}
              </span>
              <span className="tweet-screen-name">
                @{this.props.tweet.user.screen_name}
              </span>
            </div>
            <a className="tweet-datetime-anchor" href={this.url} onClick={this.onAnchorClicked.bind(this)} tabIndex="-1">
              <Time className="tweet-datetime" time={this.props.tweet.created_at} />
            </a>
          </div>
          <div className="tweet-body-container">
            <TweetBody tweet={this.props.tweet} />
            <div className="tweet-buttons">
              {this.favoriteButton}
              <i className="fa fa-reply tweet-button-reply" />
            </div>
          </div>
        </div>
      </li>
    );
  }
}
