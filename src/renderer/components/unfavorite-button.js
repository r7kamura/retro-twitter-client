import React from 'react'
import viewEventPublisher from '../singletons/view-event-publisher'

export default class UnfavoriteButton extends React.Component {
  onUnfavoriteButtonClicked(event) {
    event.preventDefault();
    viewEventPublisher.emit('unfavorite-button-clicked', this.props.tweet.id_str);
  }

  render() {
    return(
      <i
        className="fa fa-star tweet-button-unfavorite"
        onClick={this.onUnfavoriteButtonClicked.bind(this)}
      />
    );
  }
}
