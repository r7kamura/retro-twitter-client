import React from 'react'

class RetweetAvatar extends React.Component {
  render() {
    return(
      <div className="tweet-avatar-parent">
        <img className="tweet-avatar" src={this.props.tweet.retweeted_status.user.profile_image_url} height="48" width="48" />
        <img className="tweet-avatar-child" src={this.props.tweet.user.profile_image_url} height="24" width="24" />
      </div>
    );
  }
}

class RetweeterDisplayName extends React.Component {
  render() {
    return(
      <span className="tweet-retweeter-display-name">
        <i className="fa fa-retweet"></i>
        {' '}
        {this.props.tweet.user.name}
      </span>
    );
  }
}

class TweetAvatar extends React.Component {
  render() {
    return <img className="tweet-avatar" src={this.props.tweet.user.profile_image_url} height="48" width="48" />
  }
}

export default class Tweet extends React.Component {
  getAvatarComponent() {
    if (this.getRetweeted()) {
      return <RetweetAvatar tweet={this.props.tweet} />;
    } else {
      return <TweetAvatar tweet={this.props.tweet} />;
    }
  }

  getBody() {
    if (this.getRetweeted()) {
      return this.props.tweet.retweeted_status.text;
    } else {
      return this.props.tweet.text;
    }
  }

  getDisplayName() {
    if (this.getRetweeted()) {
      return this.props.tweet.retweeted_status.user.name;
    } else {
      return this.props.tweet.user.name;
    }
  }

  getRetweeted() {
    return !!this.props.tweet.retweeted_status;
  }

  getRetweeterDisplayNameComponentIfNeeded() {
    if (this.getRetweeted()) {
      return <RetweeterDisplayName tweet={this.props.tweet} />;
    }
  }

  getScreenName() {
    if (this.getRetweeted()) {
      return this.props.tweet.retweeted_status.user.screen_name;
    } else {
      return this.props.tweet.user.screen_name;
    }
  }

  render() {
    return(
      <li className="tweet" key={this.props.tweet.id_str}>
        <div className="tweet-sub">
          {this.getAvatarComponent()}
        </div>
        <div className="tweet-main">
          <div className="tweet-header">
            <div className="tweet-names">
              <span className="tweet-display-name">
                {this.getDisplayName()}
              </span>
              <span className="tweet-screen-name">
                @{this.getScreenName()}
              </span>
              {this.getRetweeterDisplayNameComponentIfNeeded()}
            </div>
            <div className="tweet-datetime">
              {this.props.tweet.created_at}
            </div>
          </div>
          <div className="tweet-body">
            {this.getBody()}
          </div>
        </div>
      </li>
    );
  }
}
