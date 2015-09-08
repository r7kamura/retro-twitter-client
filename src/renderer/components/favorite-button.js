import React from 'react'

export default class FavoriteButton extends React.Component {
  onFavoriteButtonClicked(event) {
    event.preventDefault();
    this.props.onFavoriteButtonClicked(this.props.tweet.id_str);
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
