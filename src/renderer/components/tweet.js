import React from 'react'

export default class Tweet extends React.Component {
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
            <div className="tweet-datetime">
              {this.props.tweet.created_at}
            </div>
          </div>
          <div className="tweet-body">
            {this.props.tweet.text}
          </div>
        </div>
      </li>
    );
  }
}
