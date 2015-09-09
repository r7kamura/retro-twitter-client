import FavoriteButton from './favorite-button'
import React from 'react'
import Time from './time'
import TweetBody from './tweet-body'
import UnfavoriteButton from './unfavorite-button'

export default class Tweet extends React.Component {
  get favoriteButton() {
    if (this.props.tweet.favorited) {
      return <UnfavoriteButton
        onUnfavoriteButtonClicked={this.props.onUnfavoriteButtonClicked}
        tweet={this.props.tweet}
      />;
    } else {
      return <FavoriteButton
        onFavoriteButtonClicked={this.props.onFavoriteButtonClicked}
        tweet={this.props.tweet}
      />;
    }
  }

  get url() {
    return `https://twitter.com/${this.props.tweet.user.screen_name}/status/${this.props.tweet.id_str}`;
  }

  onAnchorClicked(event) {
    event.preventDefault();
    this.props.onAnchorClicked(event.currentTarget.href);
  }

  onFavoriteButtonClicked(event) {
    event.preventDefault();
    this.props.onFavoriteButtonClicked(this.props.tweet.id_str);
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
            <TweetBody onAnchorClicked={this.props.onAnchorClicked} tweet={this.props.tweet} />
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
