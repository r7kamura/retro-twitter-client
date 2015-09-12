import React from 'react'
import viewEventPublisher from '../singletons/view-event-publisher'

export default class FavoriteButton extends React.Component {
  onFavoriteButtonClicked(event) {
    event.preventDefault();
    viewEventPublisher.emit('favorite-button-clicked', this.props.tweet.id_str);
  }

  render() {
    return(
      <i
        className="fa fa-star tweet-button-favorite"
        onClick={this.onFavoriteButtonClicked.bind(this)}
      />
    );
  }
}
