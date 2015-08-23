import React from 'react'

export default class TweetsItem extends React.Component {
  render() {
    return(
      <li className="tweets-item">
        <div className="tweets-item-sub">
          <img className="tweets-item-avatar" src={this.props.tweet.user.profile_image_url} height="48" width="48" />
        </div>
        <div className="tweets-item-main">
          <div className="tweets-item-header">
            <div className="tweets-item-names">
              <span className="tweets-item-display-name">
                {this.props.tweet.user.name}
              </span>
              <span className="tweets-item-screen-name">
                @{this.props.tweet.user.screen_name}
              </span>
            </div>
            <div className="tweets-item-datetime">
              {this.props.tweet.created_at}
            </div>
          </div>
          <div className="tweets-item-body">
            {this.props.tweet.text}
          </div>
        </div>
      </li>
    );
  }
}
