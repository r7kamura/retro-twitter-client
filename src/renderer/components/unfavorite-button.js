import React from 'react'

export default class UnfavoriteButton extends React.Component {
  onUnfavoriteButtonClicked(event) {
    event.preventDefault();
    this.props.onUnfavoriteButtonClicked(this.props.tweet.id_str);
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
