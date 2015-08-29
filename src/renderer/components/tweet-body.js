import React from 'react'
import Time from './time'
import twitterText from 'twitter-text'

export default class Tweet extends React.Component {
  getInnerHtmlOptions() {
    return {
      __html: twitterText.autoLink(
        this.props.tweet.text,
        {
          urlEntities: this.props.tweet.entities.urls
        }
      )
    };
  }

  render() {
    return(
      <div className="tweet-body" dangerouslySetInnerHTML={this.getInnerHtmlOptions()} />
    );
  }
}
