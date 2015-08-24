import React from 'react'
import twitterClient from '../twitter-client';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onSubmitButtonClicked(event) {
    twitterClient.postTweet({ text: this.state.text });
    this.setState({ text: '' });
  }

  onTextareaChanged(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return(
      <div className="editor">
        <div>
          <textarea name="name" rows="3" cols="40" className="editor-textarea" onChange={this.onTextareaChanged.bind(this)} placeholder="What's happening?" value={this.state.text}></textarea>
        </div>
        <div>
          <button className="editor-submit-button" onClick={this.onSubmitButtonClicked.bind(this)} type="button">
            <i className="fa fa-bullhorn"></i>
            Tweet
          </button>
          <div className="editor-counter">
            140
          </div>
        </div>
      </div>
    );
  }
}
